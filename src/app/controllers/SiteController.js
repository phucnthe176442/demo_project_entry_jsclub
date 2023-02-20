const Task = require("../models/Task");

class SiteController {
  // [GET] /
  index(req, res) {
    if (req.session.user) {
      Task.find({})
        .then((tasks) => {
          tasks = tasks.map((tasks) => tasks.toObject());
        })
        .catch((error) => next(error));

      Submission.find({})
        .then((submissions) => {
            submissions = submissions.map((submissions) => submissions.toObject());
        })
        .catch((error) => next(error));

      var Object = { username, tasks, susmissions };

      Object.username = req.session.user;
      res.render("home", Object);
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SiteController();
