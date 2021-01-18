'use strict';

const TrialRecord = require('../../domain/trial-record')

/**
 * Originally shared code between SQLIte and PostgeSQL repositories
 */
module.exports = (resultSet) => {
    return resultSet.map(covidRow => {
        if (covidRow !== undefined) {
            return TrialRecord(covidRow.id, covidRow.source, covidRow.source_id, covidRow.results_available, covidRow.review_status, covidRow.ipd_sharing, covidRow.intervention_type,
                covidRow.intervention_name, covidRow.n_enrollment, covidRow.country, covidRow.status, covidRow.randomized, covidRow.n_arms, covidRow.blinding,
                covidRow.population_condition, covidRow.control, covidRow.out_primary_measure, covidRow.start_date, covidRow.end_date, covidRow.title, covidRow.abstract,
                covidRow.entry_type, covidRow.url);
        }
    });
}