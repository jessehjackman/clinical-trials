'use strict';

const env = require('../config/environment')
module.exports = require('knex')({
    client: 'pg',
    connection: {
        user: env.database.username,
        host: env.database.location,
        port: env.database.port,
        database: env.database.name,
        password: env.database.password,
    },
    debug: env.database.debug,
    pool: { min: 0, max: 7 }
});