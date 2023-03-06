const Task = require("../models/Task");
const Testcase = require("../models/Testcase");

class TaskController {
  // [GET] /homepage/tasks/:slug
  index(req, res, next) {
    if (req.session.user) {
      Task.findOne({ slug: req.params.slug })
        .lean()
        .then((task) => {
          // res.json(task)
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

  // [POST] /homepage/tasks/create/
  create(req, res, next) {
    if (req.session.user) {
      Task.find({}).then((tasks) => {
        if (tasks.length == 50) {
          res.redirect("/error/Cannot add more task, try delete old tasks");
        } else {
          const FormData = {
            task_name: req.body.task_name,
            score: req.body.score,
            slug: req.body.saveName,
          };
          let task = new Task(FormData);
          task.save();
          res.redirect("/homepage");
        }
      });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/tasks/delete
  del(req, res, next) {
    if (req.session.user) {
      Task.findOneAndDelete({ slug: req.body.slug }).then((task) => {
        Testcase.deleteMany({ task_name: task.slug }).then((testcases) => {
          res.redirect("/homepage");
        });
      });
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new TaskController();
