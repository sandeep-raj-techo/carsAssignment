'use strict';
/**
 * This file  is used to glob all the values and Reset MongoDB 
 * In this case we have only Car model but we can extend. 
 */


// Dependencies

//dependencies
const env = process.env.ENV;
const config = require('./config');
const mongoose = require('./mongoose');
const path = require('path');
const glob = require('glob');


// Globbing value files
const resetDB = function(cb) {
  config.server.values.map(function(pattern) {
    glob(pattern, function(err, files) {
      if (err) {
        console.log(err);
        return;
      }
      files.map(function(model) {
        require(path.resolve(model)).resetCollection(mongoose); // Here mongoose is form file ./mongoose.js
      });
      if (cb) {
        cb();
      }
    });
  });
}

if (env === 'test') {
  module.exports = resetDB;
} else {
  resetDB();
}

