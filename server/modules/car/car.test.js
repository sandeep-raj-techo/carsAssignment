'use strict';

//Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const CarValues = require('./car.values').defaultValues;
const app = require('./../../index');

// Configure Dependencies
chai.use(chaiHttp);
const should = chai.should();

// Initilize Variables

let id;

/**
 * Unit tests
 */

describe('Car Route Unit Tests:', function() {


  describe('Method Get', function() {


    it('should be able to throw error when carId is invalid', function(done) {
      this.timeout(10000);

      chai.request(app)
        .get('/carDetails/thisIsAnInvalidCarId')
        .end(function(err, res) {
          should.exist(err);
          should.exist(res);
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('code');
          res.body.should.have.property('message');
          res.body.code.should.equal('INVALID_CAR_ID');
          done();
        });
    });

  });
});

