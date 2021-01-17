'use strict';
require('dotenv').config();
const CovidPostgresRepo = require('../../../lib/infrastructure/repositories/relational-repository')

test('givenLimitThenYieldLimitResults)', async () => {
    // given query
    const queryParameters = {
        limit: '10',
        page: '0',
        order: 'start_date',
        query: '?',
        fields: '*'
    };

    // when
    const result = await new CovidPostgresRepo().find(queryParameters)
    // then
    expect(result.length).toBe(10);
});