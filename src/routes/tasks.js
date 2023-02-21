const express = require("express");
const router = express.Router();

const taskController = require("../app/controllers/TaskController");

router.get('/homepage/tasks/bai1', taskController.index);

module.exports = router;
