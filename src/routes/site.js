const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

const taskRouter = require("../routes/tasks")
const submitRouter = require("../routes/submit")

router.use("/submit", submitRouter);
router.use("/tasks", taskRouter);
router.use("/", siteController.index);

module.exports = router;
