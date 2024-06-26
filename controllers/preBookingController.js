const PreBooking = require('../models/PreBooking');
const Car = require('../models/Car');

const getBookingHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await PreBooking.find({ userId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const createBooking = async (req, res) => {
    try {
        const { userId, carId, bookingTime, contact } = req.body;

        const newBooking = new PreBooking({
            userId,
            carId,
            bookingTime,
            contact
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await PreBooking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking.bookStatus = 'cancelled';
        await booking.save();

        res.status(200).json({ msg: 'Booking cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getBookingHistory,
    createBooking,
    cancelBooking
};
