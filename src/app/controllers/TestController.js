const Task = require("../models/Task");

class TestController {
    //[GET] homepage/tests/showCreate
  showCreate(req, res, next) {
    if(req.session.user) {
        console.log(req.params.slug);
        res.render("createTest", {
          slug: req.params.slug,
        });
    } else 
        res.redirect("/");
  }

  //[POST] homepage/tests/create
  create(req, res, next) {
    if(req.session.user) {
        res.redirect("/homepage/admin");
    } else 
        res.redirect("/");
  }
}

module.exports = new TestController();
