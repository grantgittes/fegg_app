// Data Model for player
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {type: String, required:[true,'name required']},
    professor: {type: String, required:[true,'professor required']},
    description: {type: String, required:[true,'description required']}
  });

// Export model
module.exports = mongoose.model("course", CourseSchema);