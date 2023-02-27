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
    User.find({ user_name: username, pass_word: password })
      .then((users) => {
        users.map((users) => users.toObject());
        
        if(username === "admin" && password === "1") {
          req.session.user = username;
          res.redirect("/homepage/admin");
        }
        else if (
          users.length === 1 &&
          users[0].user_name === username &&
          users[0].pass_word === password
        ) {
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
