'use strict';

const env = require('../config/environment')
const axios = require('axios')
const CovidRepository = require('../../domain/covid-repository');

module.exports = class extends CovidRepository {


    async find(queryParams) {
        try {
            const sort = [];
            sort.push({[queryParams.order]: queryParams.direction});

            const esQuery = Object.freeze({
                from: queryParams.page,
                size: queryParams.limit,
                _source: queryParams.fields,
                sort : sort,
                query: {
                    query_string: {
                        query: queryParams.query,
                        fields: ["title", "abstract"],
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
}