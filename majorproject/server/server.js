
// const express = require('express');

//const app = express();
const port = process.env.PORT || 5000;

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });


var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost/";


    
mongoose.connect("mongodb://localhost/databasee");
var app = express();
var Username;


app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get("/", function(req, res){
    //res.render("home");
    res.send("Homepage");
});


// Auth Routes

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({Username1: req.body.username1,username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        Username = req.body.username1;
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home");
        });
    });
});

// LOGIN ROUTES
//render login form
// app.get("/login", function(req, res){
//    //res.render("login"); 
//    res.send("Log in");
// });
//login logic
//middleware
app.post('/login',
passport.authenticate('local'),function(req, res) {
 // If this function gets called, authentication was successful.
 // `req.user` contains the authenticated user.
 //res.send(req.user.username);
 res.redirect('/home');

 //console.log(req.user.username);
    
});
app.get('/login',function(req,res){
    res.json(JSON.stringify({name: req.user.username,login:"true"}));
});


app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.get("/home/:username",function(req,res){
   // console.log(req.user.username);
   let username =req.user.username;
   res.send(JSON.stringify({name:username}));
    //res.redirect('/home')
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get("/username",function(req,res){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("databasee");
      dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        User.find({username:Username},function(err,user){
            if(err){
                console.log(err);
            }
            else{
                // console.log(Username);
                // console.log(user);
                res.send(user);
               
            }
        })
        //console.log(result);
        db.close();
      });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));