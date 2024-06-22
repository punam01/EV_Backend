const mongoose = require('mongoose');

const demoDriveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
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
        unique:true
    },
    bookStatus: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});

module.exports = mongoose.model('DemoBooking', demoDriveSchema);
