'use strict';


const Joi = require('joi');
const CovidValidator = require('../../domain/covid-validator')

const schema = Joi.object({
    limit: Joi.number().min(1).max(1000).default(10),
    page: Joi.number().min(0).max(10000).default(0),
    order: Joi.string().valid( 'start_date', 'start_date:desc','start_date:asc', 'end_date', 'end_date:desc','end_date:asc').default('start_date'),
    query: Joi.string().max(1000, 'utf8').lowercase().default('?'),
    field: Joi.array().items(Joi.string().valid('source', 'source_id', 'results_available', 'review_status', 'ipd_sharing',
        'intervention_type', 'intervention_name', 'n_enrollment', 'country', 'status', 'randomized',
        'n_arms', 'blinding', 'population_condition', 'control', 'out_primary_measure', 'start_date', 'end_date',
        'title', 'abstract', 'entry_type', 'url')).single().unique().max(22)
});

/**
 * Concretion of a payload validation for business rules. In this case its just http payload.
 */
module.exports = class extends CovidValidator {
    async validate(data) {
        try {
            const parameters = await schema.validateAsync(data, {convert: true});
            let [sort, direction] = parameters.order.split(':')
            parameters.order = sort;
            parameters.direction = 'asc';
            if(direction !== undefined){
                parameters.direction = direction;
            }
            if(parameters.fields === undefined){
                parameters.fields = ['source', 'source_id', 'results_available', 'review_status', 'ipd_sharing',
                    'intervention_type', 'intervention_name', 'n_enrollment', 'country', 'status', 'randomized',
                    'n_arms', 'blinding', 'population_condition', 'control', 'out_primary_measure', 'start_date', 'end_date',
                    'title', 'abstract', 'entry_type', 'url'];
            }
            return Object.freeze(parameters);
        } catch (validationError) {
            const error = new Error(validationError.message);
            error.statusCode = 400;
            throw error;
        }
    }
}