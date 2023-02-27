const express = require("express");
const router = express.Router();

const SubmitController = require("../app/controllers/SubmitController");

router.use("/", SubmitController.createSubmission);

module.exports = router;
