import 'jasmine';
import * as request from 'supertest';
import app from './app';
import * as Mongoose from 'mongoose';

describe('App', () => {
  afterAll(() => {
    //clean up db after tests
    Mongoose.connection.dropCollection('users');
  });
  it('should work', () => {
    expect(app).toBeTruthy();
  });
  describe('Test users path', () => {
    describe('/user', () => {
      it('should response to /user post method', done => {
        const user = {
          email: 'test@test',
          password: '1234'
        };

        request(app)
          .post(`/user`)
          .send(user)
          .then(resp => {
            expect(resp.status).toEqual(200);
            expect(resp.body.msg).toEqual('user created');
            done();
          })
          .catch(err => done());
      });

      it('should return error msg when request body is broken', done => {
        const brokenUser = {
          password: '1234'
        };

        request(app)
          .post(`/user`)
          .send(brokenUser)
          .then(resp => {
            expect(resp.status).toEqual(500);
            expect(resp.body.msg).toEqual('failed to create user');
            done();
          })
          .catch(err => done());
      });
    });

    describe('/login', () => {
      it('should response to /login post method', done => {
        const user = {
          email: 'test@test',
          password: '1234'
        };

        request(app)
          .post(`/login`)
          .send(user)
          .then(resp => {
            expect(resp.status).toEqual(200);
            expect(resp.body.msg).toBeTruthy();
            done();
          })
          .catch(err => done());
      });

      it('should prevent to login when wrong credentials are passed', done => {
        const user = {
          email: 'test@test',
          password: '12345'
        };

        request(app)
          .post(`/login`)
          .send(user)
          .then(resp => {
            expect(resp.status).toEqual(401);
            expect(resp.body.msg).toEqual('invalid email');
            done();
          })
          .catch(err => done());
      });
    });
  });
});
