const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema ({
  task_name: { type: String },
  task_description: { type: String },
  time_limit: { type: String },
  memory_limit: { type: String },
  slug: { type: String },
  score: { type: Number }
});

module.exports = mongoose.model('Task', Task);
