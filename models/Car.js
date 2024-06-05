const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    configurations: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
    },
    range: {
        type: Number,
        required: true,
        min: 0
    },
    odometer: {
        type: Number,
        required: true,
        min: 0
    },
    topSpeed: {
        type: Number,
        required: true,
        min: 0
    },
    seating: {
        type: Number,
        required: true,
        min: 1
    },
    cargoCapacity: {
        type: Number,
        required: true,
        min: 0
    },
    trim: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }],
        validate: [arr => arr.length > 0, 'At least one trim option is required']
    },
    acceleration: {
        type: Number,
        required: true,
        min: 0
    },
    colors: [{
        color: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    autoPilot: {
        type: Boolean,
        default: false
    },
    wheels: [{
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    steering: [{
        type: {
            type: String,
            enum:[
                "wheel",
                "yoke"
            ],
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    images: [
        {
            type: String,
            required: true
        }
    ],
    testDrive:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Car', carSchema);
