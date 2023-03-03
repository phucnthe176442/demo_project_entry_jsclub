const { json } = require("express");
const User = require("../models/User");

class UserController {
  // [GET] /homepage/users/showAll
  index(req, res, next) {
    if (req.session.user) {
      User.find({})
        .lean()
        .then((users) => {
          //res.json(task)
          res.render("users", { username: req.session.user, users });
        })
        .catch(next);
    } else {
      res.redirect("/");
    }
  }

  // [GET] /homepage/users/show
  show(req, res, next) {
    if (req.session.user) {
      res.render("createUser", { username: req.session.user });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/users/create/
  create(req, res, next) {
    if (req.session.user) {
      let FormData = {
        user_name: req.body.user_name,
        score: 0,
        email: req.body.email,
        pass_word: "1",
      };
      let user = new User(FormData);
      user.save();
      res.redirect("/homepage/users/showAll");
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/users/delete
  del(req, res, next) {
    if (req.session.user) {
      User.findOneAndDelete({ user_name: req.body.user_name }).then((user) => {
        res.redirect("/homepage/users/showAll");
      });

    } else {
      res.redirect("/");
    }
  }
}

module.exports = new UserController();
