const Loaction = require("../models/Location")

const getLocationById = async (req, res) => {
    try {
        const id = await Loaction.findById(req.params.id);
        if (!id) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.status(200).json(id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getLocationByState = async (req, res) => {
    try {
        const state = await Loaction.findById(req.params.state);
        if (!state) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.status(200).json(state);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const getLocationByPin = async (req, res) => {
    try {
        const pin = await Loaction.findById(req.params.pincode);
        if (!pin) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.status(200).json(pin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}
module.exports = {
    getLocationById,
    getLocationByState,
    getLocationByPin
}