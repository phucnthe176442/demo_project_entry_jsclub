const express = require("express");
const router = express.Router();

const SubmitController = require("../app/controllers/SubmitController");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/solutions");
  },
  filename: (req, file, cb) => {
    req.body.code = req.session.user + '_' + Date.now();
    cb(null, req.body.code+".c");
  },
});
let upload = multer({ storage: storage });
router.use("/", upload.single("solution"), SubmitController.createSubmission);

module.exports = router;
