'use strict';

/**
 * Jest mock upskill
 */
const bootstrap = require('../../../lib/infrastructure/config/bootstrap');
const request = require('supertest')
let app;

let mockRepositoryResult; //Establishing the reference so that this object can be mutated in the tests below
jest.mock('../../../lib/infrastructure/repositories/relational-repository', () => () => mockRepositoryResult);

beforeAll(async () => {
    app = await bootstrap.init();
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
            expect(record).toEqual(expect.objectContaining({
                start_date: null
            }))
        })

        it('given no results expect empty record', async () => {
            mockRepositoryResult = [];
            const response = await request(app).get('/v1/covid');
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([]);
        })
    });
});