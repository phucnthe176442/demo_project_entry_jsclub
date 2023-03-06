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
    res.render("login", { username: false, notLogin: req.notLogin });
  });

  app.post("/", (req, res) => {
    const { username, password } = req.body;
    // TODO: check the credentials in the database
      User.findOne({ user_name: username, pass_word: password })
        .lean()
        .then((users) => {
          if (username === "admin" && password === "1") {
            req.session.user = username;
            req.session.admin = true;
            res.redirect("/homepage");
          } else if (users && users.user_name === username && users.pass_word === password) {
            req.session.user = username;
            req.session.admin = false;
            res.redirect("/homepage");
          } else {
            req.notLogin=true;
            res.redirect('/');
            // res.render("login", { username: false, notLogin: true });
          }
        })
        .catch((error) => console.log(error));
  });

  app.use("/homepage", siteRouter);
}

module.exports = route;
