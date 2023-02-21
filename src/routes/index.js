const rankingRouter = require("./ranking");
const siteRouter = require("./site");
const session = require("express-session");

function route(app) {
  app.get('/ranking', rankingRouter);

  app.use(
    session({
      secret: "mysecretkey",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.get('/', (req, res) => {
    res.render('login');
  });

  app.post('/', (req, res) => {
    const { username, password } = req.body;

    // TODO: check the credentials in the database

    if (username === "admin" && password === "1") {
      req.session.user = username;
      res.redirect('/homepage');
    } else {
      res.send("Invalid username or password");
    }
  });

  console.log('bug')
  app.get('/homepage', siteRouter);
}

module.exports = route;
