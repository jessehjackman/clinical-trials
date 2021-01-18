'use strict';

const {pick} = require('lodash');

/**
 * Response serializer
 */
module.exports = (data, fields) => {
    if (Array.isArray(data)) {
        return data.map(record => Object.freeze(pick(record, fields)));
    }
    return Object.freeze(pick(data, fields));
};