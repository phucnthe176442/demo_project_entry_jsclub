const express = require("express");
const router = express.Router();

const rankingController = require("../app/controllers/RankingController");

router.get("/ranking", rankingController.index);
router.use("/", (req, res) => res.redirect("/error/404 not-found"));

module.exports = router;
