var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    Username1: String,
    username: String,
    password: String,
    rating: []
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);