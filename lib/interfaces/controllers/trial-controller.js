'use strict';

const serializePayload = require('../serializers/request-payload-serializer')
const findClinicalTrials = require('../../application/use_cases/find-covid-trial');
const serializeResults = require('../serializers/trial-record-serializer');
const {validator, repository} = require('../../infrastructure/config/service-locator');

/**
 * validate the business logic inputs - note: request query parameters should probably be done first thing
 * (e.g. express middleware or akin) while the business logic specific data should be done independently of framework
 * Validation mechanism is injected and can be swapped out easily at a later date.
 * extract the query parameters from the request and do not pass along the request or any other framework concern to
 * the inner layers - i.e. keep the use case and domain clean
 */
module.exports = async (data) => {
    //validate payload against business rules -> if we had any - in this case its just joi again to transform the params
    const validatedParameters = await validator.validate(data);

    //parameters are validated we now call the use case with the injected repository, once again repository details should
    //NOT leak into the business logic - avoid tight coupling.
    const results = await findClinicalTrials(repository, validatedParameters);

    //transform the results and return back to the framework for presentation
    return serializeResults(results, validatedParameters.fields);
};
