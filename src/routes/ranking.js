const express = require("express");
const router = express.Router();

const rankingController = require("../app/controllers/RankingController");

router.get('/ranking', rankingController.index);

module.exports = router;
