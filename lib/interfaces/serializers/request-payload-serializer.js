'use strict'

module.exports = (request) => {
    let parameters = {};
    if (request.query !== undefined) {
        parameters = Object.freeze({
            query: request.query.query,
            order: request.query.order,
            fields: request.query.field,
            page: request.query.page,
            limit: request.query.limit
        });
    }
    return parameters;
}