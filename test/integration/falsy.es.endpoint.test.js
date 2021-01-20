'use strict';

/**
 * Spy upskill
 * TODO: COMPLETE ME
 */

require('dotenv').config();
const axios = require('axios');
const request = require('supertest')
const expressServer = require('../../lib/infrastructure/webserver/expressjs-server');
const esFalsyResponse = require('../data/response/elasticsearch-falsy-record.json')
let app;

beforeAll(async () => {
    app = await expressServer();
})

afterEach(async () => {
    jest.resetModules();
    jest.restoreAllMocks();
})

describe('Falsy elasticsearch result', () => {
    describe("Expect 200", () => {
        it('given falsy response expect 200', async () => {
            const mockGet = jest.spyOn(axios, 'post');
            mockGet.mockImplementation(() => {
                return {data: esFalsyResponse};
            });

            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;
            const properties = Object.keys(record);
            expect(properties.length).toEqual(22);
            expect(record).toEqual(expect.objectContaining({
                "source": "",
                "source_id":  "",
                "results_available":  "",
                "review_status":  "",
                "ipd_sharing":  "",
                "intervention_type":  "",
                "intervention_name": "",
                "n_enrollment":  0,
                "country":  "",
                "status":  "",
                "randomized":  "",
                "n_arms":  0,
                "blinding":  "",
                "population_condition":  "",
                "control":  "",
                "out_primary_measure":  "",
                "start_date":  "",
                "end_date":  "",
                "title":  "",
                "abstract":  "",
                "entry_type":  "",
                "url": ""
            }))
            // expect(record).toEqual(expect.objectContaining({
            //     source: expect.any(String),
            //     n_enrollment: expect.any(Number)
            // }))
        })

    });
});