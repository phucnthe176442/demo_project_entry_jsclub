const express = require("express");
const router = express.Router();

const SubmitController = require("../app/controllers/SubmitController");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/solutions");
  },
  filename: (req, file, cb) => {
    req.body.code = req.session.user + "_" + Date.now();
    cb(null, req.body.code + ".c");
  },
});
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    fieldNameSize: 30,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/octet-stream") {
      console.log(file.mimetype);
      req.wrongFile = true;
      return cb(null, false, new Error("Wrong file type"));
    }
    cb(null, true);
  },
});
router.post("/", upload.single("solution"), SubmitController.createSubmission);
router.use("/", (req, res) => res.redirect("/error/404 not-found"));

module.exports = router;
