const express = require("express");
const router = express.Router();

const taskController = require("../app/controllers/TaskController");

router.get('/:slug', taskController.index);

module.exports = router;
