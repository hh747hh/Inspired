var mongoose  = require("mongoose");

var TeacherSchema = {
  name:     String

}

mongoose.model("Teacher", TeacherSchema);

mongoose.connect("mongodb://localhost/breatheNow");

module.exports = mongoose;
