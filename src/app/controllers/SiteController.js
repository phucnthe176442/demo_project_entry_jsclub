const Task = require("../models/Task");
const Submission = require("../models/Submission");

class SiteController {
  // [GET] /
  index(req, res) {
    if (req.session.user) {
      Task.find({})
        .then((tasks) => {
          tasks = tasks.map((tasks) => tasks.toObject());
          Submission.find({})
            .then((submissions) => {
              submissions = submissions.map((submissions) =>
                submissions.toObject()
              );
              res.render("home", {
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

module.exports = new SiteController();
