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

});


module.exports = mongoose.model("EQuery", querySchema);