const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Testcase = new Schema ({
    task_name: { type: String },
    slug: { type: String },
});

module.exports = mongoose.model('Testcase', Testcase);
