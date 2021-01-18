'use strict';
const path = require('path')
const env = require('../config/environment')
const express = require('express');
const createMiddleware = require('@apidevtools/swagger-express-middleware');
const SwaggerParser = require('@apidevtools/swagger-parser')
const swagger = '../../../doc/swagger.json';
const app = express()

/**
 * Express Setup
 */
module.exports = async () => {

    const loadSwaggerFile = async (file) => {
        const swaggerFile = path.join(__dirname, file)
        return SwaggerParser.dereference(swaggerFile)
    }

    const parsedSwaggerSpec = await loadSwaggerFile(swagger)
    const middleware = createMiddleware(parsedSwaggerSpec, app)
    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest(),
    )
    app.use(require('../../interfaces/expressjs-routes'));

    app.listen(env.server.port)
    return app
}
