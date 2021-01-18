'use strict';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../doc/swagger.json');
const router = require('express').Router();

//version 1 routes
router.use('/v1', require('./v1-routes'));

//docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
