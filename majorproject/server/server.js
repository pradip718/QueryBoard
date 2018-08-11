
const port = process.env.PORT || 5000;

var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose")
    var MongoClient        =require('mongodb').MongoClient;
    var Query              =require("./models/query");
    var Comment            =require("./models/comment");
    var Blogs              =require("./models/blogs");
    var Tag                =require("./models/tag");


mongoose.connect("mongodb://localhost:27017/databasee", { useNewUrlParser: true });
var app = express();
var Username;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
app.get('/login',isLoggedIn,function(req,res){
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



//routes
app.get("/query",isLoggedIn,function(req,res){
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
        var userImage   =req.body.image;
          let username=req.user.username;
        let tag=req.body.tags;
      // console.log("parse body",JSON.parse(req.body));
       // console.log("tags are:-",req.body)
        
        var newQuery = {
            name:username,
            image:userImage,
            description:postQuery,
            tags:tag
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
app.post("/queries/:id",isLoggedIn,function(req,res){
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



app.post("/queries/comment/ratings/:id",isLoggedIn,function(req,res){
    //res.send("Comment Added");
    Comment.findById(req.params.id,function(err,commentRating){
       
       
        if(err){
            console.log(err);
        }
        else{
            commentRating.rating.push(req.body.ratings);
            commentRating.save();


            //console.log("query is:",comment);
           
            //console.log(commentRating.rating);
        }
        
    });
})

app.get("/queries/comment/ratings/:id",function(req,res){

Comment.findById(req.params.id,function(err,commentRating){
    if(err){
        console.log(err);
    } else {
       var ratings=commentRating.rating;
       console.log(ratings);
       var sum =0;
       for(var i=0; i<ratings.length;i++){
           sum += parseInt(ratings[i],10);
       }
       console.log("sum",sum);
       // res.json("sum =",sum);
       res.json({"sum is:":sum})
    }
});


});






app.get("/queries/:id",isLoggedIn,function(req,res){
    Query.findById(req.params.id).populate("comments").exec(function(err, query){
        if(err){
            console.log(err);
        } else {
           
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

app.get("/Blogs",isLoggedIn,function(req,res){
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
 

app.post("/Blogs",isLoggedIn,function(req,res){
    var postQuery =req.body.userquery;
    username=req.user.username;
   //console.log("userimahe", req.body.images);
    var newQuery = {
        name:username,
        description:postQuery
    }
    if(sum>=20){
    Blogs.create(newQuery,function(err,newlyCreated){
        if(err){
            console.log("dsfds",err);
        }
        else{
            res.redirect("http://localhost:3000/expert");
        }
    })

}
else{
    res.send("you are not qualified to post.");
}
   // res.send("you hit the post route")
});


app.listen(port, () => console.log(`Listening on port ${port}`));