const express = require("express");
const router = express.Router();
const path = require("path");
const taskController = require("../app/controllers/TaskController");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/tasks");
  },
  filename: (req, file, cb) => {
    req.body.saveName =
      req.body.task_name.replace(/[^a-zA-Z0-9]+/g, "") + "_" + Date.now();
    cb(null, req.body.saveName + ".pdf");
  },
});
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    fieldNameSize: 30,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      console.log(file.mimetype);
      req.wrongFile = true;
      return cb(null, false, new Error("Wrong file type"));
    }
    cb(null, true);
  },
});
router.post("/delete", taskController.del);
router.post(
  "/create",
  upload.single("task_description"),
  taskController.create
);
router.get("/showCreate", taskController.showCreate);
router.get("/:slug", taskController.index);
router.use("/", (req, res) => res.redirect("/error/404 not-found"));

module.exports = router;
