'use strict';

/**
 * *abstract* class that provides the validation contract for subclasses.
 * @type {module.exports}
 */
module.exports = class {
    validate(data) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}