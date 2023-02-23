const express = require("express");
const router = express.Router();
const taskRouter = require("./tasks");

const siteController = require("../app/controllers/SiteController");


router.get('/tasks', taskRouter);
router.get('/homepage', siteController.index);


module.exports = router;
