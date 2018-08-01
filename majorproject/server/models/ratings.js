var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    rating: Number,
    author:String
}); 
module.exports = mongoose.model("Ratings", ratingSchema);