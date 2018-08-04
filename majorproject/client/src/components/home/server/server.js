
const port = process.env.PORT || 5000;

var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost/";
    var Query             =require("./models/query");
    var Comment           =require("./models/comment");
    var Blogs              =require("./models/blogs")


    
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
    res.json({name: req.user.username,login:"true"});
});


app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// app.get("/username",function(req,res){
//     MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("databasee");
//       dbo.collection("users").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         User.find({username:Username},function(err,user){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 // console.log(Username);
//                 // console.log(user);
//                 res.send(user);
               
//             }
//         })
//         //console.log(result);
//         db.close();
//       });
//     });
// });


//from prefinal major
// var querySchema = new mongoose.Schema({
//     query : String
// }) 

// var Query =mongoose.model("Query",querySchema);

// Query.create({
//     name: "pradip",
//     description:"How much powerful is JavaScript in 2018"
// },function(err,query){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly created Query");
//         //console.log(query);
//     }
// });

//routes
app.get("/query",function(req,res){
    Query.find({},function(err,queries){
        if(err){
            console.log(err);
        }
        else{
           // console.log("queries from get",queries);
            res.json(queries);
        }
    })
});


app.post("/queries",function(req,res){
        var postQuery =req.body.userquery;
        var userImages =req.body.image;
        username=req.user.username;
       //console.log("userimahe", req.body.images);
        var newQuery = {
            name:username,
            image:userImages,
            description:postQuery
        }
        Query.create(newQuery,function(err,newlyCreated){
            if(err){
                console.log("dsfds",err);
            }
            else{
                res.redirect("http://localhost:3000/home");
            }
        })
       // res.send("you hit the post route")
});


//Comment Post handle
app.post("/queries/:id",function(req,res){
    //res.send("Comment Added");
    Query.findById(req.params.id,function(err,query){
        if(err){
            console.log(err);
        }
        else{
            console.log(query);
            Comment.create({
                text:req.body.comment,
                author:req.user.username
            },function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    query.comments.push(comment);
                    query.save();
                    res.redirect("http://localhost:3000/home");

                }
            })
        }
    });

})

app.get("/queries/:id",function(req,res){
    Query.findById(req.params.id).populate("comments").exec(function(err, query){
        if(err){
            console.log(err);
        } else {
            //console.log(query);
            //render show template with that campground
            //res.render("campgrounds/show", {campground: foundCampground});
            res.json(query);
        }
    });
});



//COMMENT EDIT ROUTE
// app.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comment_id, function(err, foundComment){
//        if(err){
//            res.redirect("back");
//        } else {
//          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
//        }
//     });
//  });
 
//  // COMMENT UPDATE
//  app.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//        if(err){
//            res.redirect("back");
//        } else {
//            res.redirect("/campgrounds/" + req.params.id );
//        }
//     });
//  });

app.get("/Blogs",function(req,res){
    Blogs.find({},function(err,Blogs){
        if(err){
            console.log(err);
        }
        else{
           // console.log("queries from get",queries);
            res.json(Blogs);
        }
    })
});
 

app.post("/Blogs",function(req,res){
    var postQuery =req.body.userquery;
    username=req.user.username;
   //console.log("userimahe", req.body.images);
    var newQuery = {
        name:username,
        description:postQuery
    }
    Blogs.create(newQuery,function(err,newlyCreated){
        if(err){
            console.log("dsfds",err);
        }
        else{
            res.redirect("http://localhost:3000/expert");
        }
    })
   // res.send("you hit the post route")
});




app.listen(port, () => console.log(`Listening on port ${port}`));