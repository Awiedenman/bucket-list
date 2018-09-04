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
          response.should.be.json;
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('title');
          response.body[0].should.have.property('description');
          done();
        })
    })
  })

  describe('POST /api/v1/bucketList', () => {
    it('should post a new item to the bucketList db', (done) => {
      chai.request(server)
        .post('/api/v1/bucketList')
        .send({
          title: 'eating goals',
          description: 'Eat body weight in cabbage.'
        })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(201);
          response.body.should.be.a('array');
          done();
        })
    })

    it('Should not create a new list item is there are missing parameters', (done) => {
      chai.request(server)
        .post('/api/v1/bucketList')
        .send({
          "title": "garbage"
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.should.be.html;
          // response.body.error.should.equal('Expected format: {title: <STRING>, description: <TEXT> } You are missing a "description" property')
          done();
        })
    });
  })

  describe('DELETE /api/v1/bucketList', () => {
    it('should delete a item from bucketList', (done) => {
      chai.request(server)
        .delete('/api/v1/bucketList/1')
        .end((error, response) => {
          response.should.have.a.status(204);
          response.text.should.be.a('string');
          done();
        })
    })

    it('Should return a 404 if a list item is not found', (done) => {
      chai.request(server)
        .delete('/api/v1/list_items/1')
        .end((error, response) => {
          response.should.have.status(404);
          // response.should.be.json;
          // response.body.error.should.equal('could not find list item with id: "1")
          done();
        })
    });

  });
})