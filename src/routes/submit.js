const express = require("express");
const router = express.Router();

const SubmitController = require("../app/controllers/SubmitController");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //   cb(null, 'D:/Srping2023/JS/ProjectC/demo_project_entry_jsclub/src/public/solutions');
    cb(null, "./src/public/solutions");
  },
  filename: (req, file, cb) => {
    cb(null, "solution.c");
  },
});
let upload = multer({ storage: storage });
router.use("/", upload.single("solution"), SubmitController.createSubmission);

module.exports = router;
