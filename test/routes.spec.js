const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex.js')

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done())
  })

  describe('GET api/v1/bucketList', () => {
    it('should return a list of all the bucketList', (done) => {
      chai.request(server)
      .get('/api/v1/bucketList')
      .end((error, response) => {
        response.should.have.status(200);
        // response.body.should.be.a('array');
        // response.should.be.json;
        // response.body[0].should.have.property('id');
        // response.body[0].should.have.property('title');
        // response.body[0].should.have.property('description');
        done();
      })
    })
  })

})