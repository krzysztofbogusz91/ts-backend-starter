import "mocha";
import * as request from "supertest";
import app from "../app";
import { expect } from "chai";
import { config } from "../config/app-config";
import { connector } from "../connectors/mongoose.connector";
import { User } from "../models/user.model";
import {
  mockUser,
  mockUserWithHashedPassword,
  mockUserWithWrongPassword,
  mockUserWithWrongEmail
} from "../mocks/users.mock";

describe("/auth", () => {
  before(done => {
    connector
      .openConnection(config.testDb)
      .then(() => done())
      .catch(() => done());
  });

  before(done => {
    const user = new User(mockUserWithHashedPassword);
    // populate db for testing env
    user
      .save()
      .then(() => done())
      .catch(err => {
        console.log(err, "error while preparing test db");
        done();
      });
  });

  after(done => {
    connector
      .dropDb("users")
      .then(() => {
        connector.closeConnection();
        done();
      })
      .catch(err => {
        connector.closeConnection();
        done();
      });
  });

  it("should login user", done => {
    request(app)
      .post(`/auth/login`)
      .send(mockUser)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(200);
        expect(resp.body).to.have.property("msg");
        done();
      });
  });

  it("should prevent to login when wrong password is passed", done => {
    request(app)
      .post(`/auth/login`)
      .send(mockUserWithWrongPassword)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(401);
        expect(resp.body.msg).to.equal("wrong login or password");
        done();
      });
  });

  it("should prevent to login when wrong credentials are passed", done => {
    request(app)
      .post(`/auth/login`)
      .send(mockUserWithWrongEmail)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(401);
        expect(resp.body.msg).to.equal("wrong login or password");
        done();
      });
  });

  it("should return response with cookie when user is correctly validated", done => {
    request(app)
      .post(`/auth/login`)
      .send(mockUser)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.header).to.have.property("set-cookie");
        expect(resp.header["set-cookie"].length).to.equal(1);
        done();
      });
  });

  it("should return response without cookie when user is not validated", done => {
    request(app)
      .post(`/auth/login`)
      .send(mockUserWithWrongEmail)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.header).not.to.have.property("set-cookie");
        done();
      });
  });

  it("should logout user and clear session", done => {
    request(app)
      .get(`/auth/logout`)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(200);
        expect(resp.body.msg).to.be.ok;
        done();
      });
  });
});
