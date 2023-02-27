const express = require("express");
const router = express.Router();

const taskController = require("../app/controllers/TaskController");

router.use("/showCreate", taskController.showCreate)
router.use("/create", taskController.create);
router.use("/:slug", taskController.index);

module.exports = router;
