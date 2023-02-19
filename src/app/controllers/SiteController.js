class SiteController {
    // [GET] /
    index(req, res) {
        res.render('login');
    }
}

module.exports = new SiteController;