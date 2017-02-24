'use strict';
/**
 * This file used for Car Module Logic
 */

const mongoose = require('mongoose');
const Car = mongoose.model('Car');

/**
 * Return Makes of Cars 
 */
const getMakes = function(req, res) {
  Car.find().select('make').exec(function(err, makes) {
    if (err) {
      // Send 500 in case of err. 
      // Can create a different file for err file and err codes 
      return res.status(500).json({
        code: 'DATABASE_ERROR',
        messge: 'Quering MongoDB returned Error'
      });
    }
    return res.status(200).json(makes);
  });

};

/**
 *  Returns the Whole car Object 
 */
const getDetails = function(req, res) {
  let id = req.params.carId;

  // Send 400 when Id is not valid. 
  // Can create a different file for err file and err codes 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      code: 'INVALID_CAR_ID',
      message: 'Given carId is Invalid'
    });
  }

  Car.findOne({ '_id': id }).exec(function(err, carDetails) {
    if (err) {
      // Send 500 in case of err. 
      // Can create a different file for err file and err codes 
      return res.status(500).json({
        code: 'DATABASE_ERROR',
        messge: 'Quering MongoDB returned Error'
      });
    }
    res.status(200).json(carDetails);
  });
};

module.exports = { getMakes, getDetails };

