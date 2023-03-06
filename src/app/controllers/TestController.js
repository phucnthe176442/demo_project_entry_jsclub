const Task = require("../models/Task");
const Testcase = require("../models/Testcase");

class TestController {
  //[GET] homepage/tests/:slug/showCreate
  showCreate(req, res, next) {
    if (req.session.user) {
      console.log(req.params.slug);
      Testcase.find({ task_name: req.params.slug })
        .lean()
        .then((testcases) => {
          res.render("createTest", {
            username: req.session.user,
            slug: req.params.slug,
            tests: testcases,
          });
        })
        .catch(next);
    } else res.redirect("/");
  }

  //[POST] homepage/tests/create
  create(req, res, next) {
    if (req.session.user) {
      Testcase.find({ task_name: req.body.slug }).then((testcases) => {
        if (testcases.length == 10) {
          res.redirect("/error/Cannot add more test, try delete old tests");
        } else {
          let formData = {
            task_name: req.body.slug,
            input: req.body.input,
            output: req.body.output,
          };
          let testcase = new Testcase(formData);
          testcase.save();
          res.redirect("/homepage/tests/" + req.body.slug + "/showCreate");
        }
      });
    } else res.redirect("/");
  }

  // [POST] /homepage/tests/delete
  del(req, res, next) {
    if (req.session.user) {
      Testcase.findOneAndDelete({ _id: req.body._id }).then((test) => {
        res.redirect("/homepage/tests/" + req.body.slug + "/showCreate");
      });
    } else res.redirect("/");
  }
}

module.exports = new TestController();
