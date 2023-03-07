const express = require("express");
const router = express.Router();

router.get("/:slug", (req, res) => res.render("error", { msg: req.params.slug }));

module.exports = router;
