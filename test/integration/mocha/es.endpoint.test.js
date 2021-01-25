'use strict';

/**
 * Jest spyOn axios post method which is used by the elasticsearch repository to satisfy the request.
 */
const bootstrap = require('../../../lib/infrastructure/config/bootstrap');
const axios = require('axios');
const request = require('supertest')
const esFalsyResponse = require('../../data/response/elasticsearch-falsy-response.json')
const sinon = require('sinon');
const expect = require("chai").expect;

let app;

before(async () => {
    process.env.REPOSITORY_DIALECT = 'es';
    app = await bootstrap.init();
})

describe('Falsy elasticsearch result', () => {
    describe("Expect 200", () => {
        it('given falsy response expect 200', async () => {
            sinon.stub(axios, 'post').callsFake(() => {
                return {data: esFalsyResponse};
            });
            const response = await request(app).get('/v1/covid');
            // expect(spyAxiosPost).toBeCalledTimes(1);
            expect(response.statusCode).to.equal(200);
            const [record] = response.body;
            expect( Object.keys(record).length).to.equal(22);
            // expect(record).toEqual(expect.objectContaining(falsyRecord))
        })

    });
});