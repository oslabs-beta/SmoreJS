const request = require('supertest');

const server = 'http://localhost:3003';

describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        it('responds with 200 status and json content type', () => request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
      });
    });
});

