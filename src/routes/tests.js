const express = require("express");
const router = express.Router();

const testController = require("../app/controllers/TestController");

router.use("/create", testController.create);
router.use("/:slug/showCreate", testController.showCreate)

module.exports = router;
