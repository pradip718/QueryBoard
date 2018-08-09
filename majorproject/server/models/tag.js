var mongoose = require("mongoose");

var tagSchema = mongoose.Schema({
    text: []
});

module.exports = mongoose.model("Tag", tagSchema);