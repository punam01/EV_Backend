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
    },
    customization: {
        exteriorColor: {
          price: { type: Number, required: true },
          value: { type: String, required: true }
        },
        glass: {
          price: { type: Number, required: true },
          value: { type: String, required: true }
        },
        interiorColor: {
          price: { type: Number, required: true },
          value: { type: String, required: true }
        },
        range: {
          price: { type: Number, required: true },
          value: { type: String, required: true }
        },
        wheelColor: {
          price: { type: Number, required: true },
          value: { type: String, required: true }
        },
        chargerType: {
            price: { type: Number, required: true },
            value: { type: String, required: true }
          }
      },
      estimatedPrice: {
        type: Number,
        required: true
      },
      location: {
        address: { type: String },
        city: { type: String},
        name: { type: String},
        pincode: { type: String },
        state: { type: String }
      },
    });
preBookingSchema.index({ userId: 1, carId: 1 }, { unique: true });
module.exports = mongoose.model('PreBooking', preBookingSchema);
