const { json } = require("express");
const User = require("../models/User");
const Submission = require("../models/Submission");

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
      User.find({}).then((users) => {
        if (users.length == 30)
          res.send("Cannot add more user, try delete old users");
        else {
          let FormData = {
            user_name: req.body.user_name,
            score: 0,
            email: req.body.email,
            pass_word: "1",
          };
          let user = new User(FormData);
          user.save();
          res.redirect("/homepage/users/showAll");
        }
      })
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
  // [POST] /homepage/users/updateName
  updateName(req, res, next) {
    if (req.session.user) {
      User.find({ user_name: req.body.new_username }).then((users) => {
        if (users.length == 0)
          User.findOneAndUpdate({ user_name: req.body.old_username }, { user_name: req.body.new_username }).then((user) => {
            Submission.updateMany({ user_name: req.body.old_username }, { user_name: req.body.new_username }).then((submissions) => {
              req.session.user = req.body.new_username;
              res.redirect("/homepage");
            })
          });
        else
          res.send('Username cannot be duplicated')
      })
    } else {
      res.redirect("/");
    }
  }
  // [POST] /homepage/users/updatePass
  updatePass(req, res, next) {
    if (req.session.user) {
      User.findOneAndUpdate({ user_name: req.session.user, pass_word: req.body.old_password }, { pass_word: req.body.new_password }).then((user) => {
        if (user)
          res.redirect("/homepage");
        else {
          res.send('Wrong old password');
        }
      });

    } else {
      res.redirect("/");
    }
  }
}

module.exports = new UserController();
