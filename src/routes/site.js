const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

const taskRouter = require("../routes/tasks")
const submitRouter = require("../routes/submit")
const testRouter = require("../routes/tests")
const userRouter = require("../routes/users")

router.use("/submit", submitRouter);
router.use("/tasks", taskRouter);
router.use("/tests", testRouter);
router.use("/users", userRouter);
router.use("/", siteController.index);

module.exports = router;
