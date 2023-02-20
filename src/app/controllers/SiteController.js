const session = require("express-session");
class SiteController {
    // [GET] /
    index(req, res) {
        if (req.session.user) {
            var Object = { username: "admin" }
            Object.username = req.session.user;
            res.render('home', Object)
        } else {
            res.redirect('/');
        }
    }
}

module.exports = new SiteController;