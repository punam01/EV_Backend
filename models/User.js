const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    custom_id: {
        type: String,
        required: true,
        unique:true
      },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    contact:{
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
    testdrive:{
        type:Boolean,
        default:false,
        required:true
    }
})

module.exports=mongoose.model('User',userSchema)