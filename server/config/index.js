'use strict';

//dependencies
const env = process.env.ENV || 'dev';

// Get common config values
const commonConfig = require('./common');
//Get env specific values 
//TODO: if env file not present
const envConfig = require('./' + env);

/**
 * This function is used to process variables according to env and any other config and generate config file accordingly
 * @return config {object}
 */
const generateConfig = function() {
  // Combine the Objects 
  return Object.assign(commonConfig, envConfig);
};

module.exports = generateConfig();

