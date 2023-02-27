const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

const tasksRouter = require("../routes/tasks");

router.use("/tasks", tasksRouter);
router.use("/", adminController.index);

module.exports = router;
