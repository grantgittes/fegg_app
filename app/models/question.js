// Data Model for player
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    topic: {type: String, required:true},
    text: {type: String, required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:false
    },
    post_date:{ type: Date, default: Date.now },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required:true
    }
  });

// Export model
module.exports = mongoose.model("question", QuestionSchema);