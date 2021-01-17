'use strict';

const router = require('express').Router();
const clinicalTrialController = require('../controllers/trial-controller')
const asyncErrorWrapper = require('../../infrastructure/webserver/async-error-wrapper')

router.get('/covid', asyncErrorWrapper(async (req, res) => {
    /**
     * 13.1.3 Cache-control Mechanisms
     * The basic cache mechanisms in HTTP/1.1 (server-specified expiration
     * times and validators) are implicit directives to caches. In some
     * cases, a server or client might need to provide explicit directives
     * to the HTTP caches. We use the Cache-Control header for this purpose.
     *
     * This is a skill-up project so direct the clients to not cache the covid endpoint
     */
    res.setHeader('Cache-Control', 'no-cache');

    const parameters = Object.freeze({
        query: req.query.query,
        order: req.query.order,
        fields: req.query.field,
        page: req.query.page,
        limit: req.query.limit
    });

    const responseData = await clinicalTrialController(parameters);
    res.json(responseData)
}))


module.exports = router;
