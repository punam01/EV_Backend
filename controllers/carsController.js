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
    const formattedVariants = car.variants.map(variant => ({
      ...variant._doc,
      features: Array.isArray(variant.features) ? variant.features.join(', ') : variant.features,
    }));
    res.json(formattedVariants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getDesiredVariant = async (req, res) => {
  try {
    const { color, modelName, steering, minPrice, maxPrice } = req.query;

    const query = {};

    if (modelName) {
      query.name = modelName;
    }

    if (steering) {
      query['steering'] = steering;
    }

    if (minPrice && maxPrice) {
      query['variants.price'] = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query['variants.price'] = { $gte: minPrice };
    } else if (maxPrice) {
      query['variants.price'] = { $lte: maxPrice };
    }

    if (color) {
      query['variants.customizableOptions'] = { $elemMatch: { name: 'color', 'options.name': color } };
    }

    const desiredVariants = await Car.find(query).populate('variants');
    if (!desiredVariants || desiredVariants.length === 0) {
      return res.status(404).json({ message: 'Variants not found' });
    }
    console.log(desiredVariants)
    res.json(desiredVariants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getCarById,
  getAllCars,
  getDesiredVariant,
  getAllVariants
}