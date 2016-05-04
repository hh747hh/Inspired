var mongoose  = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');


var TeacherSchema = {
  name:          String,
  occupation:    String,
  image_url:     String,
  title:         String,
  category:      String,
  video_url:     String,
  link_url:      String,
  description:   String,
  thoughts:      String
};

var UserSchema = {
  name:         String,
  password:     String

};


if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URL); // make sure this says MONGODB NOT MONGOLAB
}else{
  mongoose.connect("mongodb://localhost/breatheNow");
} //heroku attempt







mongoose.model("Teacher", TeacherSchema);
mongoose.model("User", UserSchema);


module.exports = mongoose;
