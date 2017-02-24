'use strict';

// Dependencies

const config = require('./config');
const express = require('express');
const path = require('path');
const glob = require('glob');

/**
 * Configure Dependencies
 */
require('./mongoose').connect();
// Init Express app

const app = express();
app.use(express.static('./../dist'));
app.use('/public', express.static('./../public'));

// Globbing Route files
// Here we only have car routes but can extend in future. 
config.server.routes.map(function(pattern) {
  glob(pattern, function(err, files) {
    if (err) {
      console.log(err);
      return;
    }
    files.map(function(route) {
      require(path.resolve(route))(app);
    });
  });
});

// Start Server

app.listen(config.port, function(err) {
  if (err) {
    return console.log('error occured starting the server', err);
  }
  console.log('server started at port', config.port);
});

if (process.env.ENV === 'test') {
  module.exports = app;
}

