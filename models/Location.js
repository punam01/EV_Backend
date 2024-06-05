const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    contact: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        match: [/^\+?[1-9]\d{10,12}$/, 'Please use a valid contact number.']
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    pincode:{
        type: String,
        required: true,
        trim: true,
        match: [/^\d{5,6}$/, 'Please use a valid pincode.']
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    state:{
        type:String,
        required:true,
        trim:true,
    },
    availability: [
        {
            carModel: String,
            availableTimes: [Date]
        }
    ]
})

module.exports = mongoose.model('Location', locationSchema)