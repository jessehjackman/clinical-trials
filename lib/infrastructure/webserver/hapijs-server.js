'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');

/**
 * hapijs server
 */
const createServer = async () => {

  // Create a server with a host and port
  const server = Hapi.server({
    port: process.env.PORT || 3000
  });

  // Register vendors plugins
  await server.register([
    Blipp,
    Inert,
    Vision,
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000 * 60
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', log: '*', error: '*', response: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      },
    },
  ]);

  // Register custom plugins
  await server.register([
    require('../../interfaces/hapijs-routes/trial-routes'),
  ]);

  return server;
};

module.exports = createServer;
