// Data Model for player
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    text: {type: String, required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:false
    },
    post_date:{ type: Date, default: Date.now },
    net_vote: {type: Number, default: 0},
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
        required:true
    }
  });

// Export model
module.exports = mongoose.model("answer", AnswerSchema);