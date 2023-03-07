const express = require("express");
const router = express.Router();

const testController = require("../app/controllers/TestController");

router.post("/create", testController.create);
router.post("/delete", testController.del);
router.get("/:slug/showCreate", testController.showCreate);
router.use("/", (req, res) => res.redirect("/error/404 not-found"));

module.exports = router;
