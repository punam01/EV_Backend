const Car=require("../models/Car")

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

const getAllCars=async (req, res) => {
    try {
      const cars = await Car.find();
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
module.exports={
    getCarById,
    getAllCars
}