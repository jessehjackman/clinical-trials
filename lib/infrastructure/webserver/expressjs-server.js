const env = require('../config/environment')
const express = require('express')
const app = express()

module.exports = async () => {

    app.use(require('../../interfaces/expressjs-routes'));

    app.all('*', (req, res, next) => {
        const error = new Error(`Whoops, ${req.originalUrl} is not a valid API call`);
        error.statusCode = 404;
        next(error);
    });

    app.use(function(error, req, res, next) {
        res.status(error.statusCode === undefined ? 500 : error.statusCode).json({ message: error.message === undefined ? 'uncaught' : error.message });
    });

   return app.listen(env.server.port)
}
