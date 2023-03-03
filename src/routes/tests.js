const express = require("express");
const router = express.Router();

const testController = require("../app/controllers/TestController");

router.use("/create", testController.create);
router.use("/delete", testController.del);
router.use("/:slug/showCreate", testController.showCreate)


module.exports = router;
