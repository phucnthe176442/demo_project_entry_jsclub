const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.post("/create", userController.create);
router.get("/show", userController.show);
router.get("/showAll", userController.index);
router.post("/delete", userController.del);
router.post("/updateName", userController.updateName);
router.post("/updatePass", userController.updatePass);
router.use("/", (req, res) => res.redirect("/homepage"));

module.exports = router;
