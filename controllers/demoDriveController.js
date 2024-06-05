const DemoDrive = require("../models/DemoDrive")

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
        const userId = req.params.user_Id;
        console.log(userId)
        const history = await DemoDrive.find({ userId });
        console.log(history)
        if (!history || history.length === 0) {
            return res.status(404).json({ msg: 'History not found' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const addDemoBooking = async (req, res) => {
    const { userId, locationId, modelName, bookingTime, paymentMade, contact, bookStatus } = req.body;
    try {
        const newBooking = new DemoDrive({
            userId,
            locationId,
            modelName,
            bookingTime,
            paymentMade,
            contact,
            bookStatus
        })
        await newBooking.save();
        res.status(201).json({ msg: 'Demo Booking done successfully', DemoDrive: newBooking });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ msg: 'One pre booking per mobile number' });
        } else {
            res.status(500).json({ msg: 'Server error' });
        }
    }
}

const cancelBooking = async (req, res) => {
    const { bookId, bookStatus } = req.body;
    console.log(bookId);
    console.log(bookStatus);
    try {
        const canceledBooking = await DemoDrive.findByIdAndUpdate(
            bookId,
            { bookStatus },
            { new: true }
        );

        if (!canceledBooking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.status(200).json({ msg: 'Booking cancelled successfully', canceledBooking });
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
    addDemoBooking,
    cancelBooking,
    rescheduleBooking
}