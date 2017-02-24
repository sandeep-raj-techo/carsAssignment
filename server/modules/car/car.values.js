'use strict';
/**
 * This file is used to store some Dummy data for unit tests and also for populating the Dev DB. \
 */
const mongoose = require('mongoose');

const defaultValues = [{
  make: 'Ford',
  models: [{
    name: 'Edge',
    image: '/public/images/ford-edge.png',
    description: 'Luxury inside. Style outside. The overall craftsmanship and attention to detail can be seen wherever you look.'
  }, {
    name: 'Escape',
    image: '/public/images/ford-escape.jpg',
    description: 'Unique black-out trim, sport seats, leather-trimmed shift lever and steering wheel, and more. Turbocharge the looks of your Escape with the Sport Appearance Package.'
  }]
}, {
  make: 'Acura',
  models: [{
    name: 'ILX',
    image: '/public/images/acura-ilx.png',
    description: 'Innovations from the iconic NSX can be found in the ILX and across the Acura lineup. Supercar DNA gives lightning-quick gratification from a powertrain that feels nimble and precise'
  }, {
    name: 'MDX',
    image: '/public/images/acura-mdx.jpg',
    description: 'Heart-pounding performance is in its genes. And now it\'s at your command. The indomitable MDX is forged from innovations found in the iconic NSX supercar'
  }]
}];


const resetCollection = function(db) {
  db.connect(function() {
    const Car = mongoose.model('Car');
    // Clear Collection before Populatoing the DB again
    Car.remove({}, (err, data) => {
      defaultValues.map(function(car) {
        // Create a new Document
        Car.create(car).then((data) => {
          console.log('successfully created');
        }).catch((err) => {
          console.log('err', err);
        });
      });
    });
  });
}

module.exports = { defaultValues, resetCollection };

