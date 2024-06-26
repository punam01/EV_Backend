const Car = require("../models/Car")

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getAllCars = async (req, res) => {
  try {
    const models = await Car.find({}, 'modelId name manufacturer basePrice range topSpeed seatingCapacity cargoCapacity acceleration images steering autopilot variants');
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

    if (minPrice || maxPrice) {
      query['variants.price'] = {};
      if (minPrice) {
        query['variants.price']['$gte'] = minPrice;
      }
      if (maxPrice) {
        query['variants.price']['$lte'] = maxPrice;
      }
    }

    if (color) {
      query['variants.customizableOptions'] = { $elemMatch: { name: 'color', 'options.name': color } };
    }

    const desiredVariants = await Car.find(query).populate('variants');
    if (!desiredVariants || desiredVariants.length === 0) {
      return res.status(404).json({ message: 'Variants not found' });
    }
    res.json(desiredVariants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const compareCars = async (req, res) => {
  try {
    const { model1, model2 } = req.query;

    const car1 = await Car.findOne({ modelId: model1 });
    const car2 = await Car.findOne({ modelId: model2 });

    if (!car1 || !car2) {
      return res.status(404).json({ message: 'Car models not found.' });
    }

    const comparisonData = {
      basePrice1: car1.basePrice,
      basePrice2: car2.basePrice,
      range1: car1.range,
      range2: car2.range,
      topSpeed1: car1.topSpeed,
      topSpeed2: car2.topSpeed,
      seatingCapacity1: car1.seatingCapacity,
      seatingCapacity2: car2.seatingCapacity
    };

    res.json(comparisonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllModelsById = async (req, res) => {
  try {
    const models = await Car.find({}, 'modelId name');
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCarById,
  getAllCars,
  getDesiredVariant,
  getAllVariants,compareCars,
  getAllModelsById
}