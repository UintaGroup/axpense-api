process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Report = require('../../app/models/report');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Reports', () => {
  beforeEach(done => {
    Report.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET report', () => {

    it('it should GET all the reports', done => {

      chai.request(server)
        .get('/api/reports')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
    })
      ;
    });
  });

});
