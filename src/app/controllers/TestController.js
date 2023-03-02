const Task = require("../models/Task");

class TestController {
    //[GET] homepage/admin/tests/showCreate
  showCreate(req, res, next) {
    if(req.session.user) {
        res.render("createTest", { username: req.session.user });
    } else 
        res.redirect("/");
  }

  //[POST] homepage/admin/tests/create
  create(req, res, next) {
    if(req.session.user) {
        res.redirect("/homepage/admin");
    } else 
        res.redirect("/");
  }
}

module.exports = new TestController();
