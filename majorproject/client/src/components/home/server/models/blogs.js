var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
   name: String,
   description: String,
});


module.exports = mongoose.model("Blogs", blogSchema);