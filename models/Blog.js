const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    content:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    video: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tag:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Blog', blogSchema);






