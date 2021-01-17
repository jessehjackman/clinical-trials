'use strict';

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
module.exports = {
    database: {
        dialect: process.env.REPOSITORY_DIALECT,
        location: process.env.DATABASE_LOCATION,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        debug: process.env.DATABASE_DEBUG
    },
    server: {
        framework: process.env.FRAMEWORK,
        port: process.env.PORT
    },
    es: {
        queryURL: process.env.ES_QUERY_ENDPOINT,
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD
    },
    validator: process.env.VALIDATOR
};
