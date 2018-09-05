import 'jasmine';
import * as request from 'supertest';
import app from './app';
import  Mongoose from 'mongoose';
import { config } from './config/app-config';

console.log('start test file');
// it('should work', () => {
//   console.log('why this is not working?')
//   expect(app).toBeTruthy();
// });



describe('App', () => {
  describe('Test users path', () => {
    const db = Mongoose.connection;
    beforeEach(() => {
      Mongoose.connect(
        config.db,
        {
          useNewUrlParser: true
        }
      )
        .then(() => {
          console.log('connect to MongoDB successfully');
        })
        .catch(console.log);
  
    });

    it('should response to /user post method', done => {
      const user = {
        email: 'test@test',
        password: '1234'
      };
      console.log('tests');
      request(app)
        .get(`/dupa`)
        .then(resp => {
          expect(resp.status).toEqual(400);
          done();
        });
    });
  });
});
