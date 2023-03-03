const Task = require("../models/Task");
const Submission = require("../models/Submission");

class AdminController {
  // [GET] /
  index(req, res) {
    if (req.session.user) {
      Task.find({}).lean()
        .then((tasks) => {
          Submission.find({}).lean()
            .then((submissions) => {
              res.render("admin", {
                username: req.session.user,
                tasks,
                submissions,
              });
            })
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new AdminController();
