'use strict';
/**
 * This File is used to Create Routes for the Car Module
 */
const controller = require('./car.controller');
module.exports = function(app) {
  app.get('/carMakes', controller.getMakes);
  app.get('/carDetails/:carId', controller.getDetails);
};

