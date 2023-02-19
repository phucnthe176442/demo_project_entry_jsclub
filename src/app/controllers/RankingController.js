class RankingController {
    // [GET] /
    index(req, res) {
        res.render('ranking');
    }
}

module.exports = new RankingController;