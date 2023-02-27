const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

const adminRouter = require("../routes/admin")
const taskRouter = require("../routes/tasks")
const submitRouter = require("../routes/submit")

router.use("/admin", adminRouter);
router.use("/submit", submitRouter);
router.use("/tasks", taskRouter);
router.use("/", siteController.index);

module.exports = router;
