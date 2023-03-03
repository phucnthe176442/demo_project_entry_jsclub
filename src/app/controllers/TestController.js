const Task = require("../models/Task");
const Testcase = require("../models/Testcase");

class TestController {
    //[GET] homepage/tests/:slug/showCreate
  showCreate(req, res, next) {
    if(req.session.user) {
        console.log(req.params.slug);
        res.render("createTest", {
          slug: req.params.slug,
          task_name: req.params.task_name,
        });
    } else 
        res.redirect("/");
  }

  //[POST] homepage/tests/create
  create(req, res, next) {
    if(req.session.user) {
        let formData = {
          task_name: req.body.slug,
          input: req.body.input,
          output: req.body.output,
        }
        let testcase = new Testcase(formData);
        testcase.save();
        res.redirect("/homepage/tests/"+req.body.slug+"/"+req.body.task_name+"/showCreate");
    } else 
        res.redirect("/");
  }
}

module.exports = new TestController();
