const mongoose = require('mongoose');

const demoDriveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    bookingTime: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value) {
                // Ensure bookingTime is greater than current time
                return value > new Date();
            },
            message: 'Booking time must be in the future'
        }

    },
    paymentMade: {
        type: Boolean,
        default: false
    },
    contact:{
        type: String,
        required: true,
        unique: true       
    }
});

module.exports = mongoose.model('DemoBooking', demoDriveSchema);
