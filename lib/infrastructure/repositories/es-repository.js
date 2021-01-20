'use strict';

const env = require('../config/environment')
const constants = require('../config/constants')
const axios = require('axios')

/**
 * Elasticsearch subclass of the covid repository
 * Basic body query using axios post
 */
module.exports = async function find(queryParams){
    try {
        const sort = [{[queryParams.order]: queryParams.direction}];

        const esQuery = Object.freeze({
            from: queryParams.page,
            size: queryParams.limit,
            _source: queryParams.field,
            sort: sort,
            query: {
                query_string: {
                    query: queryParams.query,
                    fields: [constants.ELASTICSEARCH_LITERALS.TITLE, constants.ELASTICSEARCH_LITERALS.ABSTRACT],
                }
            }
        });

        const response = await axios.post(env.es.queryURL, esQuery, {
            auth: {
                username: env.es.username,
                password: env.es.password
            }
        });

        return response.data.hits.hits.map(record => record._source);
    } catch (e) {
        console.log(e);
        throw e;
    }
}