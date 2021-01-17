'use strict';

const findClinicalTrials = require('../../application/use_cases/find-covid-trial');
const serializeResults = require('../serializers/trial-serializer');
const {validator, repository} = require('../../infrastructure/config/service-locator');

/**
 * validate the query parameters - note: request query parameters should probably be done first thing
 * (e.g. express middleware or akin) while the business logic specific data should be done independently of framework
 * Validation mechanism is injected and can be swapped out easily at a later date.
 * extract the query parameters from the request and do not pass along the request or any other framework concern to
 * the inner layers - i.e. keep the use case and domain clean
 */
module.exports = async (req) => {
    const parameters = Object.freeze({
        query: req.query.query,
        order: req.query.order,
        fields: req.query.field,
        page: req.query.page,
        limit: req.query.limit
    });

    //call our injected validator
    const validatedParameters = await validator.validate(parameters);

    //parameters are validated we now call the use case with the injected repository, once again repository details should
    //NOT leak into the business logic - avoid tight coupling.
    const results = await findClinicalTrials(repository, validatedParameters);

    //transform the results and return back to the framework for presentation
    return serializeResults(results, validatedParameters.fields);
};
