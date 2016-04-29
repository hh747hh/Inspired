var express = require("express");
var parser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require("./db/connection");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({username: username}, function(err, user) {
      if(user){
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      }else if(!user){
        User.create({username: username, password: password}, function(err, user){
          cb(null, user);
        });
      }
    });
  }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  var app = express();

  app.set("port", process.env.PORT || 3000)
  app.set('public', __dirname + '/public');


  var Teacher = mongoose.model("Teacher");
  var User = mongoose.model("User");

  app.use(parser.json({urlencoded: true}));
  app.use("/", express.static("public"));
  app.use("/", express.static("bower_components"));
  app.use(logger('dev'));
  app.use(parser.json());
  app.use(cookieParser());



  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config


  // Define routes.

  app.get('/login',
  function(req, res){
    res.sendFile(__dirname + "/public/html/login.html");
  });

  app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.json({success: "you're logged in"});
  });

  app.get('/logout',
  function(req, res){
    req.logout();
    res.json('/');
  });

  app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.json('profile', { user: req.user });
  });






  app.get("/api/teachers", function(req, res){
    Teacher.find({}).then(function(teachers){
      res.json(teachers);
    });
  });

  app.post("/api/teachers", function(req, res){
    console.log(req.body);
    Teacher.create(req.body).then(function(teacher){
      res.json(teacher);
    });
  });

  app.get("/api/teachers/:name", function(req, res){
    Teacher.findOne({name: req.params.name}).then(function(teacher){
      res.json(teacher);
    });
  });

  app.delete("/api/teachers/:name", function(req, res){
    Teacher.findOneAndRemove({name: req.params.name}).then(function(){
      res.json({success: true});
    });
  });

  app.patch("/api/teachers/:name", function(req, res){
    Teacher.findOneAndUpdate({name: req.params.name}, req.body.teacher, {new: true}).then(function(teacher){
      res.json(teacher);
    });
  });


  app.get("/*", function(req,res){
    res.sendFile(__dirname + "/public/layout.html");
  });


  app.listen(app.get("port"), function(){
    console.log("It works");
  });
