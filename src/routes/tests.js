const express = require("express");
const router = express.Router();

const testController = require("../app/controllers/TestController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/tasks");
    },
    filename: (req, file, cb) => {
        req.body.saveName = req.body.task_name +'_'+ Date.now();
        cb(null, req.body.saveName + ".pdf");
    },
});
router.use("/create", testController.create);
router.use("/showCreate", testController.showCreate)

module.exports = router;
