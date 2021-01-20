'use strict';

/**
 * mock upskill
 * TODO: COMPLETE ME
 */

require('dotenv').config();
const request = require('supertest')
const expressServer = require('../../lib/infrastructure/webserver/expressjs-server');
let app;

let mockRepositoryResult; //Establishing the reference so that this object can be mutated in the tests below
jest.mock('../../lib/infrastructure/repositories/relational-repository', () => () => mockRepositoryResult);

beforeAll(async () => {
    app = await expressServer();
})

afterEach(async () => {
    jest.resetModules();
    jest.restoreAllMocks();
})

describe('Falsy database results', () => {
    describe("Expect 200", () => {
        it('given null string expect falsy 200', async () => {
            mockRepositoryResult = [{start_date: null}];
            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;
            const properties = Object.keys(record);
            expect(properties.length).toEqual(1);
            expect(properties.includes('title')).toBe(false);
            expect(properties.includes('start_date')).toBe(true);
        })

        it('given no results expect empty record', async () => {
            mockRepositoryResult = [{end_date:null}];
            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).toEqual(200);
            const [record] = response.body;
            const properties = Object.keys(record);
            expect(properties.length).toEqual(1);
            expect(properties.includes('start_date')).toBe(false);
            expect(properties.includes('end_date')).toBe(true);


        })
    });
});