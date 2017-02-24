'use strict';
/**
 * This Is used for common env variables. values Here can be replaced by other files.
 * @type {Object}
 */
module.exports = {
  port: 3000,
  // Patterns poniting to the specified files according to the file structure
  server: {
    routes: ['./modules/**/*.routes.js'],
    models: ['./modules/**/*.model.js'],
    tests: ['./modules/**/*.test.js'],
    values: ['./modules/**/*.values.js']
  }
};

