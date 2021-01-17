'use strict';

const covidController = require('../controllers/trial-controller');

module.exports = {
    name: 'covid-trials',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/api/covid',
                handler: async (req, res) => {
                    try {
                        return await covidController(req.query);
                    } catch (e){
                        return res.response({'error' : e.message}).code(e.statusCode);
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
