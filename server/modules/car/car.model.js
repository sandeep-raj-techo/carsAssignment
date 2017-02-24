'use strict';

//Dependencies
const mongoose = require('mongoose');

//Configure Dependencies
const Schema = mongoose.Schema;

// Define Schema
const CarSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  make: {
    type: String,
    trim: true,
    required: 'Make cannot be blank'
  },
  models: [{
    name: {
      type: String,
      trim: true,
      required: 'Model name cannot be blank'
    },
    image: {
      type: String,
      trim: true,
      required: 'Model Image source cannot be blank'
    },
    description: {
      type: String,
      trim: true,
      required: 'Model description cannot be blank'
    }
  }]
});

mongoose.model('Car', CarSchema);

