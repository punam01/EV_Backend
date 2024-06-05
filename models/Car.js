const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    configurations: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        //required: true
    },
    range: {
        type: Number,
        required: true
    },
    odometer: {
        type: Number,
        required: true
    },
    topSpeed: {
        type: Number,
        required: true
    },
    seating: {
        type: Number,
        required: true
    },
    cargoCapacity: {
        type: Number,
        required: true
    },
    trim: {
        type: String,
        enum: [
            "RWD",
            "AWD"
        ]
    },
    acceleration: {
        type: Number,
        required: true
    },
    colors: [{
        color: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    autoPilot: {
        type: Boolean,
        required: true
    },
    wheels: {
        type: String,
        enum: [
            "steel",
            "alloy",
            "multiPiece",
            "chrome",
            "diamondCut"
        ]
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    steering:{
        type:String,
        enum:[
            "wheel",
            "yoke"
        ]
    },
    testDrive:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('Car', carSchema)