const DemoDrive = require("../models/DemoDrive")
const mongoose = require('mongoose');

const getAllDemoBookings = async (req, res) => {
    try {
        const booking = await DemoDrive.find()
        res.send(booking)
    } catch (error) {
        console.log(error)
    }
}

const getUserHistory = async (req, res) => {
    try {
        const { userId } = req.body; 
        console.log("UserId from request body:", userId);

        const history = await DemoDrive.find({ userId });
        console.log("History", history);

        if (!history || history.length === 0) {
            return res.status(404).json({ msg: 'History not found' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const createDemoBooking = async (req, res) => {
    try {
        const { userId, locationId, modelName, bookingTime, contact } = req.body;

        if (!userId || !locationId || !modelName || !bookingTime || !contact) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const demoBooking = new DemoDrive({
            userId,
            locationId,
            modelName,
            bookingTime,
            contact
        });
        console.log('Booking details:', 
            userId,
            locationId,
            modelName,
            bookingTime,
            contact,
        );
        await demoBooking.save();
        res.status(201).json({ msg: 'Demo booking created successfully' });
    } catch (error) {
        console.error('Error creating demo booking:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const cancelBooking = async (req, res) => {
    const { bookId } = req.body;
    console.log(bookId);

    try {
        const deletedBooking = await DemoDrive.findByIdAndDelete(bookId);

        if (!deletedBooking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.status(200).json({ msg: 'Booking deleted successfully', deletedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const rescheduleBooking = async (req, res) => {
    const { bookId, newBookingTime } = req.body;
    try {
        const updatedBooking = await DemoDrive.findByIdAndUpdate(
            bookId,
            { bookingTime: newBookingTime },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.status(200).json({ msg: 'Booking rescheduled successfully', updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}
module.exports = {
    getAllDemoBookings,
    getUserHistory,
    createDemoBooking,
    cancelBooking,
    rescheduleBooking
}