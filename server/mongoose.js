'use strict';
/**
 * This file  is used to glob all the models and Initilise schema in Monggose. 
 * In this case we have only Car model but we canb extend. 
 */


// Dependencies

const config = require('./config');
const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

module.exports.connect = function(cb) {
  /**
   * Configure Dependencies
   */

  // Configure and Connect Mongoose
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db);

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection errored', err);
  });

  // Globbing model files
  config.server.models.map(function(pattern) {
    glob(pattern, function(err, files) {
      if (err) {
        console.log(err);
        return;
      }
      files.map(function(model) {
        require(path.resolve(model));
        if (cb) {
          cb();
        }
      });
    });
  });
};

module.exports.disconnect = function(cb) {
  mongoose.disconnect(cb);
};

