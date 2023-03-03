const express = require("express");
const router = express.Router();

const testController = require("../app/controllers/TestController");

router.use("/create", testController.create);
router.use("/:slug/:task_name/showCreate", testController.showCreate)

module.exports = router;
