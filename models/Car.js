const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    modelId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    range: {
        type: Number,
        required: true,
        min: 0,
        description: 'Range in miles'
    },    
    topSpeed: {
        type: Number,
        required: true,
        min: 0,
        description: 'speed in miles per hour'
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
        min: 0,
        description:"Acceleration time from 0 to 60 miles per hour (mph)"
    },
    images: [{
        type: String,
        required: true
    }],
    color: [String], 
    steering:{
        type:String,
        enum:[
            "wheel",
            "yoke"
        ]
    },
    autopilot: {
        type: Boolean,
        default: false 
    },
    customizableOptions: [{
        name: {
            type: String,
            required: true
        },
        options: [{
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
    }]
    /*variants: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        
    }]*/
});

module.exports = mongoose.model('Car', carSchema);






