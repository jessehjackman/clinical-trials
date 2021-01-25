'use strict';

/**
 * TODO: Work in test env variables
 * TODO: Finish the test plan
 * TODO: Complete me
 */
const bootstrap = require('../../../lib/infrastructure/config/bootstrap');
const knex = require('../../../lib/infrastructure/repositories/postgresql-queries');
const request = require('supertest')
const expect = require("chai").expect;
// const assert = require("chai").assert;

let app;

before(async () => {
    app = await bootstrap.init();
})

after(function () {
    return knex.destroy();
});

describe('Base case', () => {
    describe("Expect 200", () => {
        it('given no query parameters expect success', async () => {
            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).to.equal(200);
            expect(response.type).to.equal('application/json');
            expect(response.headers['cache-control']).to.equal('no-cache');
            expect(response.headers['x-powered-by']).to.equal('Express');
            expect(response.body.length).to.equal(10);
        });

        it('given invalid parameter field ignore and expect success', async () => {
            const response = await request(app).get('/v1/covid?invalid=invalid');
            expect(response.statusCode).to.equal(200);
            expect(response.type).to.equal('application/json');
            expect(response.headers['cache-control']).to.equal('no-cache');
            expect(response.headers['x-powered-by']).to.equal('Express');
            expect(response.body.length).to.equal(10);
        });
    });
    describe("Expect Error", () => {
        it('given invalid path expect 404', async () => {
            const response = await request(app).get('/v1/covid_error');
            expect(response.statusCode).to.equal(404);
            console.log(
                `swagger-express-middleware.requestMetadata console logs a warning when there is an invalid path
                This seems pretty nasty considering its quite common and probably expect. How can you validate everything???
                Seems like this should be a white listing option - also seems like this library is dead - last update was six months ago`);
        });
    });
});

describe('Limit query parameter', () => {
    describe("Expect 200", () => {
        it('given limit query parameter expect exact limit', async () => {
            const response = await request(app).get('/v1/covid?limit=20');
            expect(response.statusCode).to.equal(200);
            expect(response.type).to.equal('application/json')
            expect(response.body.length).to.equal(20);
        })
        it('given max limit query parameter value expect max results', async () => {
            const response = await request(app).get('/v1/covid?limit=1000');
            expect(response.statusCode).to.equal(200);
            expect(response.body.length).to.equal(1000);
        }).timeout(10000) //this test fetches 1K records and thus might take a bit longer than the default timeout
        it('given limit query parameter value of one expect one results', async () => {
            const response = await request(app).get('/v1/covid?limit=1');
            expect(response.statusCode).to.equal(200);
            expect(response.body.length).to.equal(1);
        })
    });
    describe("Expect Error", () => {
        it('given invalid limit query parameter value less than 1 expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=0');
            expect(response.statusCode).to.equal(400);
        })
        it('given invalid limit query parameter value greater than 1000 expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=1001');
            expect(response.statusCode).to.equal(400);
        })
        it('given invalid limit query type value expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=asdfa');
            expect(response.statusCode).to.equal(400);
        })
    })
});

describe('Field query parameter', () => {
    describe("Expect 200", () => {
        it('given field query parameter expect exact field', async () => {
            const response = await request(app).get('/v1/covid?limit=1&field=title');
            expect(response.statusCode).to.equal(200);
            const [record] = response.body;

            const properties = Object.keys(record);
            expect(properties.length).to.equal(1);
            expect(properties[0]).to.equal('title');
        })
        it('given multiple field query parameter expect exact fields', async () => {
            const response = await request(app).get('/v1/covid?limit=1&field=title&field=start_date');
            expect(response.statusCode).to.equal(200);
            const [record] = response.body;
            const properties = Object.keys(record);
            expect(properties.length).to.equal(2);
            expect(properties.includes('title')).to.equal(true);
            expect(properties.includes('start_date')).to.equal(true);
            expect(properties.includes('end_date')).to.equal(false);
        })

    });
});