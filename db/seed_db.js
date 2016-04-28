var mongoose = require("./connection.js");
var seedData = require("./seeds.json");

var Teacher  =  mongoose.model("Teacher");
var User     =  mongoose.model("User");

Teacher.remove().then(function(){
  Teacher.create(seedData).then(function(){
    process.exit();
  });
});
