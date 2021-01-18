'use strict';

const env = require('../config/environment')
const express = require('express')
const app = express()

/**
 * Express Setup
 */
module.exports = async () => {

    //routes
    app.use(require('../../interfaces/expressjs-routes'));

    //404 handling
    app.all('*', (req, res, next) => {
        const error = new Error(`Whoops, ${req.originalUrl} is not a valid API call`);
        error.statusCode = 404;
        next(error);
    });

    //error handling
    app.use(function(error, req, res, next) {
        res.status(error.statusCode === undefined ? 500 : error.statusCode).json({ message: error.message === undefined ? 'uncaught' : error.message });
    });

   return app.listen(env.server.port)
}
