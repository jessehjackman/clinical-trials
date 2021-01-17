'use strict';

const covidController = require('../controllers/trial-controller');

module.exports = {
    name: 'covid-trials',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/v1/covid',
                handler: async (req, res) => {
                    try {
                        let parameters = {};
                        if (req.query !== undefined) {
                            parameters = Object.freeze({
                                query: req.query.query,
                                order: req.query.order,
                                fields: req.query.field,
                                page: req.query.page,
                                limit: req.query.limit
                            });
                        }
                        return await covidController(parameters);
                    } catch (e) {
                        return res.response({'error': e.message}).code(e.statusCode === undefined ? 500 : e.statusCode);
                    }
                },
                options: {
                    description: 'search covid clinical trials',
                    tags: ['api'],
                }
            }
        ]);
    }
};
