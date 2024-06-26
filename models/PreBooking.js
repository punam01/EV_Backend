const mongoose = require('mongoose');

const preBookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    bookingTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Booking time must be in the future'
        }
    },
    paymentMade: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    bookStatus: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});

module.exports = mongoose.model('PreBooking', preBookingSchema);
