const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Testcase = new Schema({
  task_name: { type: String },
  input: { type: String },
  output: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Testcase", Testcase);
