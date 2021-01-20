'use strict';

/**
 * Primary business logic reside here
 * This example is purely a pass through to the repository
 * An example of business logic might be some machine learning algorithm that makes this API go above and beyond a simple fetch
 * @param repository
 * @param queryParameters
 * @returns {*}
 */
module.exports = (repository, queryParameters) => {
    return repository(queryParameters);
};
