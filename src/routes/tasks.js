const express = require("express");
const router = express.Router();
const path = require('path');
const taskController = require("../app/controllers/TaskController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/tasks");
    },
    filename: (req, file, cb) => {
        req.body.saveName = req.body.task_name.replace(/[^a-zA-Z0-9]+/g, '') + '_' + Date.now();
        cb(null, req.body.saveName + ".pdf");
    },
});
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 2*1024*1024,
        fieldNameSize: 30,
    },
    fileFilter: function(req, file, cb){
        if(file.mimetype !== 'pdf'){
            req.wrongFile=true;
            return cb(null, false, new Error('Wrong file type'));
        }
        cb(null, true);
    }
});
router.use("/delete", taskController.del);
router.post("/create", upload.single("task_description"), taskController.create);
router.use("/showCreate", taskController.showCreate)
router.use("/:slug", taskController.index);

module.exports = router;
