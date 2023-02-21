const rankingRouter = require("./ranking");
const siteRouter = require("./site");
const session = require("express-session");
const User = require("../app/models/User");

function checkLogin(username, password) {
  const user = User.findOne({ user_name: username, pass_word: password })
    .then((user) => {
      user = user.map((user) => user.toObject());
      return user;
    })
    .catch((error) => next(error));
  return user != null;
}

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

    if (checkLogin(username, password) === true) {
      req.session.user = username;
      res.redirect("/homepage");
    } else if (username === "admin" && password === "1") {
      req.session.user = username;
      res.redirect("/homepage");
    } else {
      res.send("Invalid username or password");
    }
  });

  console.log("bug");
  app.get("/homepage", siteRouter);
}

module.exports = route;
