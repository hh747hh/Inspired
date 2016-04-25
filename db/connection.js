var mongoose  = require("mongoose");

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
}

mongoose.model("Teacher", TeacherSchema);

mongoose.connect("mongodb://localhost/breatheNow");

module.exports = mongoose;
