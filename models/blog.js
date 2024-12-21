const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
    details : {
        type : String,
    },
    summary : {
        type : String,
    },
    postedAt : {
        type: Date,
        default:Date.now,
    },
    lastEdited : {
        type : Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("Blog", blogSchema);