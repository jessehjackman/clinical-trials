'use strict';

const constants = require('./constants')
const environment = require('./environment')

/**
 * Build out the correct services based on the env variables.
 * These services will be injected into the inner layers of the application.
 */
const buildConfiguration = () => {
    const configuration = {
        validate: require('../../interfaces/validator/joi-validator'),
    };

    if (environment.database.dialect === constants.SUPPORTED_REPOSITORIES.POSTGRES) {
        configuration.repository = require('../repositories/relational-repository');
    } else if (environment.database.dialect === constants.SUPPORTED_REPOSITORIES.ELASTICSEARCH) {
        configuration.repository = require('../repositories/es-repository');
    }

    return configuration;
}

module.exports = buildConfiguration();
