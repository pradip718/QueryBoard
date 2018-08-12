var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
   name: String,
   description: String,
   comments: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
    }
 ],
});


module.exports = mongoose.model("Blogs", blogSchema);