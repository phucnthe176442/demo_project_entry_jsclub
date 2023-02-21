const User = require("../models/User");

class RankingController {
  // [GET] /
  index(req, res) {
    User.find({})
      .sort({ score: 'desc' } )
      .then((users) => {
        users = users.map((users) => users.toObject());
        // res.json(users);
        res.render('ranking', { users });
      })
      .catch((error) => next(error));
  }
}

module.exports = new RankingController();
