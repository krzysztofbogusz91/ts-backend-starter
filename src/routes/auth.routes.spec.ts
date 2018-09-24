import "jasmine";
import * as request from "supertest";
import app from "../app";
import { config } from "../config/app-config";
import { User } from "../models/user.model";
import {
  mockUser,
  mockUserWithHashedPassword,
  mockUserWithWrongPassword,
  mockUserWithWrongEmail
} from "../mocks/users.mock";
import { connector } from "../connectors/mongoose.connector";

describe("/login", () => {
  beforeAll(done => {
    connector
      .openConnection(config.testDb)
      .then(done)
      .catch(done);
  });

  beforeAll(done => {
    const user = new User(mockUserWithHashedPassword);
    // populate db for testing env
    user
      .save()
      .then(done)
      .catch(err => {
        console.log(err, "error while preparing test db");
        done();
      });
  });

  afterAll(() => {
    connector.dropDb("users");
  });

  it("should login user", done => {
    request(app)
      .post(`/login`)
      .send(mockUser)
      .then(resp => {
        expect(resp.status).toEqual(200);
        expect(resp.body.msg).toBeTruthy();
        done();
      })
      .catch(() => done());
  });

  it("should prevent to login when wrong password is passed", done => {
    request(app)
      .post(`/login`)
      .send(mockUserWithWrongPassword)
      .then(resp => {
        expect(resp.status).toEqual(401);
        expect(resp.body.msg).toEqual("wrong login or password");
        done();
      })
      .catch(() => done());
  });

  it("should prevent to login when wrong credentials are passed", done => {
    request(app)
      .post(`/login`)
      .send(mockUserWithWrongEmail)
      .then(resp => {
        expect(resp.status).toEqual(401);
        expect(resp.body.msg).toEqual("wrong login or password");
        done();
      })
      .catch(() => done());
  });

  it("should return response with cookie when user is correctly validated", done => {
      request(app)
      .post(`/login`)
      .send(mockUser)
      .then(resp => {
        expect(resp.header["set-cookie"]).toBeTruthy();
        expect(resp.header["set-cookie"].length).toEqual(1);
        done();
      })
      .catch(() => done());
  });

  it("should return response without cookie when user is not validated", done => {
    request(app)
      .post(`/login`)
      .send(mockUserWithWrongEmail)
      .then(resp => {
        expect(resp.header["set-cookie"]).toBeFalsy();
        done();
      })
      .catch(() => done());
  });
});
