'use strict';

/**
 * *abstract* class that provides the repository contract for subclasses.
 * @type {module.exports}
 */
module.exports = class {

    find(parameters) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
