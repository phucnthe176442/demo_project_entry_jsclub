const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Submission = new Schema({
  user_name: { type: String },
  task_name: { type: String },
  status: { type: String },
  when: { type: Date },
  slug: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  code: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("Submission", Submission);
