const rankingRouter = require("./ranking");
const siteRouter = require("./site");
const session = require("express-session");
const User = require("../app/models/User");

function route(app) {
  app.get("/ranking", rankingRouter);

  app.use(
    session({
      secret: "mysecretkey",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.get("/", (req, res) => {
    res.render("login");
  });

  app.post("/", (req, res) => {
    const { username, password } = req.body;

    // TODO: check the credentials in the database

    User.find({ user_name: username, pass_word: password }).lean()
      .then((users) => {

        if (username === "admin" && password === "1") {
          req.session.user = username;
          req.session.admin = true;
          console.log('user: ' + req.session.user + ' admin: ' + req.session.admin);
        }
        else if (
          users.length === 1 &&
          users[0].user_name === username &&
          users[0].pass_word === password
        ) {
          req.session.user = username;
          req.session.admin = false;
          console.log('user: ' + req.session.user + ' admin: ' + req.session.admin);
        } else {
          res.send("Invalid username or password");
        }
        res.redirect("/homepage");
      })
      .catch((error) => console.log(error));

  });

  app.use("/homepage", siteRouter);
}

module.exports = route;
