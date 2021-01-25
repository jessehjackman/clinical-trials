'use strict';

/**
 * Jest upskill
 */
const bootstrap = require('../../../lib/infrastructure/config/bootstrap');
const request = require('supertest');
const knex = require('knex');

let app;

beforeAll(async () => {
    app = await bootstrap.init();
})

afterEach(async () => {
    jest.resetModules();
    jest.restoreAllMocks();
})

describe('Base case', () => {
    describe("Expect 200", () => {
        it('given no query parameters expect success', async () => {
            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.headers['cache-control']).toEqual('no-cache');
            expect(response.headers['x-powered-by']).toEqual('Express');
            expect(response.body.length).toEqual(10);
        });

        it('given invalid parameter field ignore and expect success', async () => {
            const response = await request(app).get('/v1/covid?invalid=invalid');
            expect(response.statusCode).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.headers['cache-control']).toEqual('no-cache');
            expect(response.headers['x-powered-by']).toEqual('Express');
            expect(response.body.length).toEqual(10);
        });
    });
    describe("Expect Error", () => {
        it('given invalid path expect 404', async () => {
            const response = await request(app).get('/v1/covid_error');
            expect(response.statusCode).toEqual(404);
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
            expect(response.statusCode).toEqual(200);
            expect(response.type).toEqual('application/json')
            expect(response.body.length).toEqual(20);
        })
        it('given max limit query parameter value expect max results', async () => {
            const response = await request(app).get('/v1/covid?limit=1000');
            expect(response.statusCode).toEqual(200);
            expect(response.body.length).toEqual(1000);
        })
        it('given limit query parameter value of one expect one results', async () => {
            const response = await request(app).get('/v1/covid?limit=1');
            expect(response.statusCode).toEqual(200);
            expect(response.body.length).toEqual(1);
        })
    });
    describe("Expect Error", () => {
        it('given invalid limit query parameter value less than 1 expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=0');
            expect(response.statusCode).toEqual(400);
        })
        it('given invalid limit query parameter value greater than 1000 expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=1001');
            expect(response.statusCode).toEqual(400);
        })
        it('given invalid limit query type value expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=asdfa');
            expect(response.statusCode).toEqual(400);
        })
    })
});

describe('Field query parameter', () => {
    describe("Expect 200", () => {
        it('given field query parameter expect exact field', async () => {
            const response = await request(app).get('/v1/covid?limit=1&field=title');
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;

            const properties = Object.keys(record);
            expect(properties.length).toEqual(1);
            expect(properties[0]).toEqual('title');
        })
        it('given multiple field query parameter expect exact fields', async () => {
            const response = await request(app).get('/v1/covid?limit=1&field=title&field=start_date');
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;
            const properties = Object.keys(record);
            expect(properties.length).toEqual(2);
            expect(record).toEqual(expect.objectContaining({
                title: expect.any(String),
                start_date: expect.any(String)
            }));
        })

    });
});