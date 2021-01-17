/**
 * wraps the callback in order to automatically pass on errors to the appropriate middleware
 */
module.exports = (callback) => (req, res, next) => callback(req, res, next).catch(next);