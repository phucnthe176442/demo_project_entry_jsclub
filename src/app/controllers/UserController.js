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

  // [POST] /homepage/users/create
  create(req, res, next) {
    if (req.session.user) {
      let validUsername = req.body.user_name.replace(/[^a-zA-Z0-9]+/g, "");
      if (validUsername === "admin")
        res.redirect("/error/Can not create another admin");
      if (validUsername.length < req.body.user_name.length)
        res.redirect("/error/Invalid username");
      User.find({}).then((users) => {
        if (users.length == 30) {
          res.redirect("/error/Cannot add more user, try delete old users");
        } else {
          User.findOne({ user_name: validUsername })
            .lean()
            .then((user) => {
              if (user) res.redirect("/error/Duplicated username");
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
            });
        }
      });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/users/delete
  del(req, res, next) {
    if (req.session.user) {
      User.findOneAndDelete({ user_name: req.body.user_name }).then((user) => {
        Submission.remove({ user_name: req.body.user_name }).then(
          (submissions) => {
            res.redirect("/homepage/users/showAll");
          }
        );
      });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/users/updateName
  updateName(req, res, next) {
    if (req.session.user) {
      if (req.session.user === "admin")
        res.redirect("/error/Can not change admin username");
      User.find({ user_name: req.body.new_username }).then((users) => {
        if (users.length == 0) {
          if (req.body.old_username == req.session.user) {
            let validName = req.body.new_username.replace(/[^a-zA-Z0-9]+/g, "");
            if (validName.length < req.body.new_username.length)
              res.redirect("/error/Invalid name, must be alphabet, number");
            User.findOneAndUpdate(
              { user_name: req.body.old_username },
              { user_name: req.body.new_username }
            ).then((user) => {
              if (user) {
                Submission.updateMany(
                  { user_name: req.body.old_username },
                  { user_name: req.body.new_username }
                ).then((submissions) => {
                  req.session.user = req.body.new_username;
                  res.redirect("/homepage");
                });
              } else res.redirect("/error/Can not find username");
            });
          } else res.redirect("/error/Wrong old username");
        } else res.redirect("/error/Username can not be duplicated");
      });
    } else {
      res.redirect("/");
    }
  }

  // [POST] /homepage/users/updatePass
  updatePass(req, res, next) {
    if (req.session.user) {
      if (req.session.user === "admin")
        res.redirect("/error/Can change admin password");
      User.findOneAndUpdate(
        { user_name: req.session.user, pass_word: req.body.old_password },
        { pass_word: req.body.new_password }
      ).then((user) => {
        if (user) {
          let validPassword = req.body.new_password.replace(
            /[^a-zA-Z0-9]+/g,
            ""
          );
          if (validPassword.length < req.body.new_password.length) {
            User.findOneAndUpdate(
              { user_name: req.session.user, pass_word: req.body.new_password },
              { pass_word: req.body.old_password }
            ).then((user) => {
              res.redirect("/error/Invalid password");
            });
          } else res.redirect("/homepage");
        } else {
          res.redirect("/error/Wrong old password");
        }
      });
    } else {
      res.redirect("/");
    }
  }
}

module.exports = new UserController();
