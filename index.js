var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();


var Teacher = mongoose.model("Teacher");

app.use(parser.json({urlencoded: true}));
app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));


app.get("/api/teachers", function(req, res){
  Teacher.find().then(function(teachers){
    res.json(teachers);
  });
});

app.get("/api/teachers/:name", function(req, res){
  Teacher.findOne(req.params).then(function(teacher){
    res.json(teacher);
  });
});

app.delete("/api/teachers/:name", function(req, res){
  Teacher.findOneAndRemove(req.params).then(function(){
    res.json({success: true});
  });
});

app.patch("/api/teachers/:name", function(req, res){
  Teacher.findOneAndUpdate(req.params, req.body, {new: true}).then(function(Teacher){
    res.json(teacher);
  });
});

app.post("/api/teachers", function(req, res){
  Teacher.create(req.body).then(function(teacher){
    res.json(teacher);
  });
});

app.get("/*", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(3000, function(){
  console.log("Power of now");
});
