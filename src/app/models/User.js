const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  ranking: { type: Number },
  username: { type: String, maxLength: 255 },
  password: { type: String, maxLength: 255 },
  emial: { type: String, maxLength: 255 },
  score: { type: Number },
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('User', User);
