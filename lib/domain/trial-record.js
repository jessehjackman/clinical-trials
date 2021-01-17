'use strict';

module.exports = (id, source, source_id, results_available, review_status, ipd_sharing, intervention_type,
                  intervention_name, n_enrollment, country, status, randomized, n_arms, blinding,
                  population_condition, control, out_primary_measure, start_date, end_date, title, abstract,
                  entry_type, url) => Object.freeze({
    id, source, source_id, results_available, review_status, ipd_sharing, intervention_type,
    intervention_name, n_enrollment, country, status, randomized, n_arms, blinding,
    population_condition, control, out_primary_measure, start_date, end_date, title, abstract,
    entry_type, url
});