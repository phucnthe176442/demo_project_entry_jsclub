class TaskController {
    index(req, res) {
        console.log("bug")
        res.render('submit');
    }
}

module.exports = new TaskController;