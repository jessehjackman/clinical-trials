'use strict';
require('dotenv').config();

const env = require('../../lib/infrastructure/config/environment')
const constants = require('../../lib/infrastructure/config/constants')
const request = require('supertest')
let app;

beforeAll(async () => {
    if (env.server.framework === constants.SUPPORTED_FRAMEWORK.EXPRESS) {
        const createServer = require('../../lib/infrastructure/webserver/expressjs-server');
        app = await createServer();
    } else if (env.server.framework === constants.SUPPORTED_FRAMEWORK.HAPI) {
        app = require('../../lib/infrastructure/webserver/hapijs-server');
    }
})


function is200(response) {
    expect(response.statusCode).toEqual(200);
}

describe('Base case', () => {
    describe("Expect 200", () => {
        it('given no query parameters expect success', async () => {
            const response = await request(app).get('/v1/covid');
            is200(response);
            expect(response.type).toEqual('application/json');
            expect(response.headers['cache-control']).toEqual('no-cache');
            expect(response.headers['x-powered-by']).toEqual('Express');
            expect(response.body.length).toEqual(10);
            //TODO: validate response data
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
        it('given invalid limit query type value expect 400', async () => {
            const response = await request(app).get('/v1/covid?limit=asdfa');
            expect(response.statusCode).toEqual(400);
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
            expect(properties.includes('title')).toBe(true);
            expect(properties.includes('start_date')).toBe(true);
            expect(properties.includes('end_date')).toBe(false);
        })
    });
    describe("Expect Error", () => {

    })
});

