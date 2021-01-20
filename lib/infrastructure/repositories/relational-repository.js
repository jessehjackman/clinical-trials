'use strict';

const covidTrialRecordsTransform = require('./trial-records-xform');
let knex = require('./postgresql-queries')

/**
 * PostgreSQL repository
 * Full text search supported
 */
module.exports = async (parameters) => {
    if (parameters.query !== '?') {  //only do the full text search query when the user specifies one
        //TODO: find a lib that cleans this query string?
        //plainto_tsquery is needed here to accommodate spaces - e.g ?query=hydroxychloroquine+randomized
        knex = knex.whereRaw(`to_tsvector('english', abstract) @@ plainto_tsquery('english', '${parameters.query}')`);
    }
    const resultSet = await knex.from('trials')
        .select(parameters.field)
        .orderBy(parameters.order, parameters.direction)
        .limit(parameters.limit)
        .offset(parameters.page);
    /**
     * TODO: Investigate why clearing is necessary, i.e. how am I using this utility incorrectly
     * For example running ?query=hydroxychloroquine+randomized&field=start_date over and over will lead to multiple 'cached' statements
     * e.g.: select start_date, start_date, start_date : This is a bug
     */
    knex.clearSelect().clearOrder().clearWhere().clearCounters().clearGroup().clearHaving();
    return covidTrialRecordsTransform(resultSet);
}
