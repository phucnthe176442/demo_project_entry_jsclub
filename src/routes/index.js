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

    User.findOne({ user_name: username, pass_word: password }).lean()
      .then((users) => {
        if (username === "admin" && password === "1") {
          req.session.user = username;
          res.redirect("/homepage/admin");
        }
        else if (users.user_name === username && users.pass_word === password) {
          req.session.user = username;
          res.redirect("/homepage");
        } else {
          res.send("Invalid username or password");
        }
      })
      .catch((error) => next(error));

  });

  app.use("/homepage", siteRouter);
}

module.exports = route;
