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
   date:String
});


module.exports = mongoose.model("Query", querySchema);