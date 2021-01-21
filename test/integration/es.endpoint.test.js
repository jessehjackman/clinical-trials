'use strict';

/**
 * Jest spyOn axios post method which is used by the elasticsearch repository to satisfy the request.
 */

require('dotenv').config();
const axios = require('axios');
const request = require('supertest')
const expressServer = require('../../lib/infrastructure/webserver/expressjs-server');
const esFalsyResponse = require('../data/response/elasticsearch-falsy-response.json')
const falsyRecord = require('../data/response/falsy-record.json')

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
            const spyAxiosPost = jest.spyOn(axios, 'post');
            spyAxiosPost.mockReturnValue({data: esFalsyResponse});
            const response = await request(app).get('/v1/covid');
            expect(spyAxiosPost).toBeCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;
            expect( Object.keys(record).length).toEqual(22);
            expect(record).toEqual(expect.objectContaining(falsyRecord))
        })

    });
});