const Car = require("../models/Car")

const getCarById = async (req, res) => {
  try {
    const user = await Car.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getAllCars = async (req, res) => {
  try {
    const models = await Car.find({}, 'name manufacturer basePrice range topSpeed seatingCapacity cargoCapacity acceleration images');
    res.json(models)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getAllVariants = async (req, res) => {
  try {
    const modelName = req.params.modelName; 
    const car = await Car.findOne({ name: modelName }).select('variants');
    if (!car) {
      return res.status(404).json({ message: 'Car model not found' });
    }
    res.json(car.variants); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getDesiredVariant = async (req, res) => {
  try {
    const { color, modelName, steering, trim, minPrice, maxPrice } = req.query;

    const query = {};

    if (color) {
      query['variants.color'] = color;
    }

    if (modelName) {
      query.name = modelName;
    }

    if (steering) {
      query['variants.steering'] = steering;
    }

    if (trim) {
      query['variants.trim'] = trim;
    }

    if (minPrice && maxPrice) {
      query['variants.price'] = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query['variants.price'] = { $gte: minPrice };
    } else if (maxPrice) {
      query['variants.price'] = { $lte: maxPrice };
    }


    const desiredVariant = await Car.findOne(query).populate('variants');
    res.json(desiredVariant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  getCarById,
  getAllCars,
  getDesiredVariant,
  getAllVariants
}