'use strict';

const constants = require('./constants')
const environment = require('./environment')
const JoiValidator = require('../../interfaces/validator/joi-validator')

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
    } /*else {
        const COVIDRepositorySQLite = require('../repositories/relational-repository');
        configuration.repository = new COVIDRepositorySQLite();
    }*/

    return configuration;
}

module.exports = buildConfiguration();
