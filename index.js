var express = require("express");
var mongoose = require("./db/connection");
var app = express();


var Teacher = mongoose.model("Teacher");

app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));


app.get("/api/teachers", function(req, res){
  Teacher.find().then(function(teachers){
    res.json(teachers);
  });
});

app.get("/*", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(3000, function(){
  console.log("Power of now");
});
