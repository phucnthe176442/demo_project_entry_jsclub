const Task = require('../models/Task')

class TaskController {
  // [GET] /homepage/tasks/:slug
  index(req, res, next) {
    if (req.session.user) {
      Task.findOne({ task_name: req.params.slug })
      .then((task) => {
        res.render("submit", { username: req.session.user, task });
      })
      .catch(next);
    } else {
      res.redirect("/");
    }
  }

  // [GET] /homepage/tasks/show
  showCreate(req, res, next) {
    if (req.session.user) {
      res.render("createTask", { username: req.session.user });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/tasks/create
  create(req, res, next) {
    if (req.session.user) {
      res.redirect("/homepage/admin")
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new TaskController();
