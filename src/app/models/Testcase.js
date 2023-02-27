const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Testcase = new Schema({
  task_name: { type: String },
  slug: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  input: { type: String},
  output: { type: String},
   
});

module.exports = mongoose.model("Testcase", Testcase);
