const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
// const Handlebars = require("express-handlebars");
const app = express();
const port = 2433;
const route = require("./routes");
const db = require("./config/db");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 1000 requests per window (here, per 15 minutes)
  message: async (request, response) => {
    response.redirect("/error/Kho^ng duo.c da^u so'i a.");
  },
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

// Apply the rate limiting middleware to all requests
app.use("/homepage/submit", limiter);

// connect db
db.connect();

// static file
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/homepage/tasks/:slug",
  express.static(path.join(__dirname, "public"))
);
app.use("/homepage", express.static(path.join(__dirname, "public")));
app.use(
  "/homepage/tasks/showCreate",
  express.static(path.join(__dirname, "public"))
);
app.use(
  "/homepage/tests/:slug/showCreate",
  express.static(path.join(__dirname, "public"))
);
app.use(
  "/homepage/users/:slug",
  express.static(path.join(__dirname, "public"))
);
app.use("/error/:slug", express.static(path.join(__dirname, "public")));

// http logger
app.use(morgan("combined"));

// post method read body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./config/db/handlebars-helpers"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log('PATH: ', path.join(__dirname, 'resources/views'))

//route init
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
