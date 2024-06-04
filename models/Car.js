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
        required: true 
    }
})

module.exports = mongoose.model('Car', carSchema)