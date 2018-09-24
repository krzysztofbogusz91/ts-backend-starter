import "jasmine";
import * as request from "supertest";
import app from "../app";
import { config } from "../config/app-config";
import { connector } from "../connectors/mongoose.connector";
import { mockUser, invalidUser } from "../mocks/users.mock";

describe("/user", () => {
  beforeAll(done => {
    connector
      .openConnection(config.testDb)
      .then(done)
      .catch(done);
  });

  afterAll(() => {
    connector.dropDb("users");
  });

  it("should response to /user post method", done => {
    request(app)
      .post(`/user`)
      .send(mockUser)
      .then(resp => {
        expect(resp.status).toEqual(200);
        expect(resp.body.msg).toEqual("user created");
        done();
      })
      .catch(() => done());
  });

  it("should return error msg when request body is broken", done => {
    request(app)
      .post(`/user`)
      .send(invalidUser)
      .then(resp => {
        expect(resp.status).toEqual(500);
        expect(resp.body.msg).toEqual("failed to create user");
        done();
      })
      .catch(() => done());
  });
});
