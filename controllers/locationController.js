const Location = require("../models/Location.js")

const getLocationById = async (req, res) => {
    try {
        const id = await Location.findById(req.params.id);
        if (!id) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.status(200).json(id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getLocationByQuery = async (req, res) => {
    try {
        const filters = {};
        if (req.query.state) {
            filters.state = req.query.state;
        }
        if (req.query.pincode) {
            filters.pincode = req.query.pincode;
        }
        if (req.query.city) {
            filters.city = req.query.city;
        }
        const locations = await Location.find(filters);

        if (locations.length === 0) {
            return res.status(404).json({ msg: 'No locations found with the provided criteria' });
        }
        const locationData = locations.map(location => ({
            city: location.city,
            contact: location.contact,
            availability: location.availability.map(availability => ({
                carModel: availability.carModel,
                availableTimes: availability.availableTimes
            }))
        }));
        res.status(200).json(locationData);
    } catch (error) {
        console.error('Error finding locations:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const updateTime = async (req, res) => {
    console.log(req.boady)
    try {
        const { locationId, carModel, timeSlot, action } = req.body;

        if (!locationId || !carModel || !timeSlot || !action) {
            return res.status(400).json({ msg: 'Location ID, car model, time slot, and action are required' });
        }

        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ msg: 'Location not found' });
        }

        const availability = location.availability.find(item => item.carModel === carModel);
        if (!availability) {
            return res.status(404).json({ msg: 'Availability not found for the specified car model' });
        }
        const formattedTimeSlot = new Date(timeSlot);
        if (action === 'add') {
            availability.availableTimes.push(formattedTimeSlot);
        } else if (action === 'remove') {
            const index = availability.availableTimes.findIndex(slot => slot.getTime() === formattedTimeSlot.getTime());
            if (index !== -1) {
                availability.availableTimes.splice(index, 1);
            } else {
                return res.status(400).json({ msg: 'The specified time slot is not in the list of available times' });
            }
        
        } else {
            return res.status(400).json({ msg: 'Invalid action. Supported actions: add, remove' });
        }

        await location.save();

        res.status(200).json({ msg: 'Time slot updated successfully' });
    } catch (error) {
        console.error('Error updating time slot:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getCarAvailabilityByPincode = async (req, res) => {
    try {
        const { pincode } = req.query;
        if (!pincode) {
            return res.status(400).json({ msg: 'Pincode is required' });
        }

        const locations = await Location.find({ pincode });
        if (locations.length === 0) {
            return res.status(404).json({ msg: 'No locations found with the provided pincode' });
        }

        const locationData = locations.map(location => ({
            _id:location._id,
            name: location.name,
            address: location.address,
            city: location.city,
            state: location.state,
            pincode: location.pincode,
            contact: location.contact,
            availability: location.availability.map(availability => ({
                carModel: availability.carModel,
                availableTimes: availability.availableTimes.map(time => {
                    let parsedTime = null;
                    if (time.$date && time.$date.$numberLong) {
                        parsedTime = new Date(parseInt(time.$date.$numberLong));
                    } else if (typeof time === 'string' || time instanceof String) {
                        parsedTime = new Date(time);
                    } else if (time instanceof Date) {
                        parsedTime = time;
                    } else {
                        console.error('Invalid time format:', time);
                    }
                    return parsedTime && !isNaN(parsedTime) ? parsedTime : null;
                }).filter(time => time !== null)
            }))
        }));

        res.status(200).json(locationData);
    } catch (error) {
        console.error('Error finding locations by pincode:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const removeDateTimeFromAvailability = async (locationId, carModel, dateTimeToRemove) => {
    console.log(locationId,carModel,dateTimeToRemove)
    try {
        const location = await Location.findById(locationId);
        if (!location) {
            throw new Error('Location not found');
        }

        // Find the carModel in availability and remove the dateTimeToRemove
        const updatedAvailability = location.availability.map(item => {
            console.log(item.carModel,carModel)
            if (item.carModel === carModel) {
                return {
                    carModel: item.carModel,
                    availableTimes: item.availableTimes.filter(time => time.getTime() !== dateTimeToRemove.getTime())
                };
            }
            return item;
        });

        location.availability = updatedAvailability;
        await location.save();
        return true;
    } catch (error) {
        console.error('Error updating availability:', error);
        return false;
    }
};

module.exports = {
    getLocationById,
    getLocationByQuery,
    updateTime,
    getCarAvailabilityByPincode,
    removeDateTimeFromAvailability
}