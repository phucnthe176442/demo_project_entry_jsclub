const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  user_name: { type: String, maxLength: 255 },
  pass_word: { type: String, maxLength: 255 },
  email: { type: String, maxLength: 255 },
  score: { type: Number },
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('User', User);
