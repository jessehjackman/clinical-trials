'use strict';
/**
 * Primary entry point for the application
 */

const bootstrap = require('./lib/infrastructure/config/bootstrap');

const start = async () => {

  try {
    await bootstrap.init();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

};
start().then(() => {
  console.log(`Covid trial skill up leveraging clean architecture is ready to serve`);
});

