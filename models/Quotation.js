const mongoose = require("mongoose")

const quotationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,

    },
    configDetails: {
        type: Map,
        of: {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    }
})

module.exports = mongoose.model('Quotation', quotationSchema);