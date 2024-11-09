const mongoose = require('mongoose');

const preBookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    carId:{
        type:String,
        required:true
    },
    /*carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    }*/
    bookingTime: {
        type: Date,
        required: true
    },
    paymentMade: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String,
        required: true,
    },
    bookStatus: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});
preBookingSchema.index({ userId: 1, carId: 1 }, { unique: true });
module.exports = mongoose.model('PreBooking', preBookingSchema);
