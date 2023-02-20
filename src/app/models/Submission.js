const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Submission = new Schema ({
    task_name: { type: String },
    status: { type: String },
    when: { type: Date },
    slug: { type: String },
});

module.exports = mongoose.model('Submission', Submission);
