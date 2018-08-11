var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author:String,
    rating:[],
});

module.exports = mongoose.model("Comment", commentSchema);