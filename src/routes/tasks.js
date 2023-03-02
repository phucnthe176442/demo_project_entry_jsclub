const express = require("express");
const router = express.Router();

const taskController = require("../app/controllers/TaskController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/tasks");
    },
    filename: (req, file, cb) => {
        req.body
        cb(null, req.body.task_name + Date.now() + ".pdf");
    },
});
let upload = multer({ storage: storage });
router.use("/create", upload.single("task_description"), taskController.create);
router.use("/showCreate", taskController.showCreate)
router.use("/:slug", taskController.index);

module.exports = router;
