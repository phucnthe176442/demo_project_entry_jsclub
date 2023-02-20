class TaskController {
    index(req, res) {
        res.render('submit');
    }
}

module.exports = new TaskController;