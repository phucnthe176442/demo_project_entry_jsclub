const express = require("express");
const router = express.Router();

const taskController = require("../app/controllers/TaskController");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //   cb(null, 'D:/Srping2023/JS/ProjectC/demo_project_entry_jsclub/src/public/solutions');
    cb(null, "./src/public/tasks");
  },
  filename: (req, file, cb) => {
    cb(null, "debai.pdf");
  },
});
let upload = multer({ storage: storage });
router.use("/create", upload.single("task_description"), taskController.create);
router.use("/showCreate", taskController.showCreate)
router.use("/:slug", taskController.index);

module.exports = router;
