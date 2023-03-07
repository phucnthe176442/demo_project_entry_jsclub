const Task = require("../models/Task");
const Testcase = require("../models/Testcase");

class TaskController {
  // [GET] /homepage/tasks/:slug
  index(req, res, next) {
    if (req.session.user) {
      Task.findOne({ slug: req.params.slug })
        .lean()
        .then((task) => {
          if(task==null)
            res.redirect('/error/Something is wrong with this pdf!');
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
    if(req.wrongFile){
      res.redirect('/error/Something wrong with your file');
    }
    else if (req.file.size > 2 * 1024 * 1024 || req.body.score < 10 || req.body.score > 1000) {
      redirect("/error/Can't create new task!");
    }
    else if (req.session.user) {
      Task.find({}).then((tasks) => {
        if (tasks.length == 50) {
          res.redirect("/error/Cannot add more task, try delete old tasks");
        } else {
          let saveName = req.body.task_name.replace(/[^a-zA-Z0-9]+/g, '');
          if (saveName.length == 0)
            saveName='task_name';
          const FormData = {
            task_name: saveName,
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
