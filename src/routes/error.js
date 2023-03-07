const express = require("express");
const router = express.Router();

router.get("/:slug", (req, res) =>
  res.render("error", { msg: req.params.slug })
);
router.use("/", (req, res) => res.redirect("/error/404 not-found"));

module.exports = router;
