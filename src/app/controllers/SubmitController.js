const Submission = require('../models/Submission');
const User = require('../models/User');

class SubmitController {
  // [POST] /homepage/submit
  createSubmission(req, res, next) {
    if (req.session.user) {
        
        res.redirect('/homepage');
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SubmitController();
