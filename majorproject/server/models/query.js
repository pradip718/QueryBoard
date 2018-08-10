var mongoose = require("mongoose");

var querySchema = new mongoose.Schema({
   name: String,
   description: String,
   image:String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   tags:[],
   ratings:[],
   avgRating:Number,
});


module.exports = mongoose.model("Query", querySchema);