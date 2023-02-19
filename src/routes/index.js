const rankingRouter = require('./ranking');
const siteRouter = require('./site');

function route(app) {
    app.use('/ranking', rankingRouter);
    app.use('/', siteRouter);
}

module.exports = route;