const Task = require("../models/Task");
const Submission = require("../models/Submission");

class SiteController {
  // [GET] /
  index(req, res) {
    if (req.session.user) {
      Task.find({}).lean()
        .then((tasks) => {
          Submission.find({ user_name: req.session.user }).lean().sort({ createAt: "desc" })
            .then((submissions) => {
              if (!req.session.admin)
                res.render("home", {
                  username: req.session.user,
                  tasks,
                  submissions
                });
              else if (req.session.admin)
                res.render("admin", {
                  username: req.session.user,
                  tasks,
                  submissions
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
