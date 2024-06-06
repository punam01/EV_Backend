const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    manufacturer: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    range: {
        type: Number,
        required: true,
        min: 0
    },
    topSpeed: {
        type: Number,
        required: true,
        min: 0
    },
    seatingCapacity: {
        type: Number,
        required: true,
        min: 1
    },
    cargoCapacity: {
        type: Number,
        required: true,
        min: 0
    },
    acceleration: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        required: true
    }],
    steering:{
        type:String,
        enum:[
            "wheel",
            "yoke"
        ]
    },
    variants: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        features: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true
        },
        customizableOptions: {
            type: Map,
            of: [{
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }]
        }
    }]
});

module.exports = mongoose.model('Car', carSchema);
