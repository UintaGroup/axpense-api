process.env.NODE_ENV = 'test';

let Category = require('../../app/models/category');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Categories', () => {
  beforeEach(done => {
    Category.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET category', () => {

    it('it should GET all the categories', done => {

      chai.request(server)
        .get('/api/categories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        })
      ;
    });
  });

  // describe('/POST category', () => {
  //
  //   it('it should not post Category without ledgerAccount field', done => {
  //     let category = {
  //       // ledgerAccount: "720012",
  //       name: "Second New Category",
  //       description: "Food handler’s permit, business licenses, etc."
  //     };
  //     chai.request(server)
  //       .post('/api/categories')
  //       .send(category)
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('errors');
  //         res.body.errors.should.have.property('ledgerAccount');
  //         res.body.errors.ledgerAccount.should.have.property('kind')
  //           .eql('required');
  //         done();
  //       });
  //   });
  //
  // });
});
