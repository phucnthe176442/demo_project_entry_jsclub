const Task = require("../models/Task");
const Submission = require("../models/Submission");

class SiteController {
  // [GET] /
  index(req, res, next) {
    if (req.session.user) {
      Task.find({}).lean()
        .then((tasks) => {
          if (!req.session.admin)
            Submission.find({ user_name: req.session.user }).sort({ createAt: 'desc' }).lean()
              .then((submissions) => {
                res.render("home", {
                  username: req.session.user,
                  tasks,
                  submissions
                });
              })
              .catch(next)
          else if (req.session.admin)
            Submission.find({}).sort({ createAt: 'desc' }).lean()
              .then((submissions) => {
                res.render("admin", {
                  username: req.session.user,
                  tasks,
                  submissions
                });
              })
              .catch(next)
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new SiteController();
