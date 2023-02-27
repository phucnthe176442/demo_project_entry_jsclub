const mongoose = require('mongoose')

async function connect() {

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/c_judging_web_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connect db successfully!!!");
  } catch (error) {
    console.log("Connect db failure!!!");
  }

}

module.exports = { connect };