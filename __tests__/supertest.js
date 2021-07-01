/* eslint-disable no-undef */
// this test file tests sever side end points

const request = require('supertest');

const server = 'http://localhost:3003';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and json content type', () => request(server)
        .get('/')
        .expect('Content-Type', /application\/json/)
        .expect(200));
    });
  });
});

describe('POST /signup', () => {
  it('responds with json', (done) => {
    request(server)
      .post('/electron/signup')
      .send({ username: 'brian', password: '12345' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /login', () => {
  it('responds with json', (done) => {
    request(server)
      .post('/electron/login')
      .send({ username: 'eileen', password: '12345' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
