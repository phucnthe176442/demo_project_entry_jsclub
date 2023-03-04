const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.use("/create", userController.create);
router.use("/show", userController.show)
router.use("/showAll", userController.index)
router.use("/delete", userController.del)
router.use("/updateName", userController.updateName)
router.use("/updatePass", userController.updatePass)
router.use("/", (req, res) => res.redirect('/homepage'))

module.exports = router;
