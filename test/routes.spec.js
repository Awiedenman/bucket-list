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
          response.body.should.be.a('array');
          response.body.should.have.length(2);
          response.should.be.json;
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1)          
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('eating goals')
          response.body[0].should.have.property('description');
          response.body[0].description.should.equal('Eat body weight in cabbage.')
          done();
        })
    })
  })

  describe('POST /api/v1/bucketList', () => {
    it('should post a new item to the bucketList db', (done) => {
      chai.request(server)
        .post('/api/v1/bucketList')
        .send({
          title: 'sleep goals',
          description: 'Never wake up.'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.should.have.length(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(3);
          done();
        })
    })

    it('Should not create a new list item if there are missing parameters', (done) => {
      chai.request(server)
        .post('/api/v1/bucketList')
        .send({
          "title": "garbage"
        })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal("Missing required information: description");
          done();
        })
    });
  })

  describe('DELETE /api/v1/bucketList', () => {
    it('should delete a item from bucketList', (done) => {
      chai.request(server)
        .delete('/api/v1/bucketList/1')
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.a.status(204);
          response.text.should.be.a('string');
          done();
        })
    })

    it('Should return a 404 if a list item is not found', (done) => {
      chai.request(server)
        .delete('/api/v1/bucketList/10')
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(404);
          response.body.should.have.property('error');
          response.body.error.should.equal(`There is no item in your database with an id of 10`);
          done();
        })
    });

  });
})