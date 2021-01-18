'use strict';

require('dotenv').config();

const constants = require('./constants');
const environment = require('./environment');

/**
 * Called by the entry point to bootstrap the http framework and start the server
 */
module.exports = {
    async init() {
        let createServer;
        if (environment.server.framework === constants.SUPPORTED_FRAMEWORK.EXPRESS) {
            createServer = require('../webserver/expressjs-server');
        } else {
            createServer = require('../webserver/hapijs-server');
        }
        const server = await createServer();
        server.start = server.start || (() => console.log(`Starting ${environment.server.framework}`));
        await server.start();
    }
};
