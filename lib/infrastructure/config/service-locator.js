'use strict';

const constants = require('./constants')
const environment = require('./environment')
const JoiValidator = require('../../interfaces/validator/joi-validator')

/**
 * Build out the correct services based on the env variables.
 * These services will be injected into the inner layers of the application.
 */
const buildConfiguration = () => {
    const configuration = {
        validator: new JoiValidator(),
    };

    if (environment.database.dialect === constants.SUPPORTED_REPOSITORIES.POSTGRES) {
        const PostgreSQLRepository = require('../repositories/relational-repository');
        configuration.repository = new PostgreSQLRepository();
    } else if (environment.database.dialect === constants.SUPPORTED_REPOSITORIES.ELASTICSEARCH) {
        const COVIDRepositoryES = require('../repositories/es-repository');
        configuration.repository = new COVIDRepositoryES();
    }

    return configuration;
}

module.exports = buildConfiguration();
