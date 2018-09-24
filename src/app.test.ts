import "mocha";
import { expect } from "chai";
import * as request from "supertest";
import app from "./app";

describe("App", () => {
  it("should return 404 when wrong url is called", done => {
    request(app)
      .post(`/wrong_url`)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(404);
        done();
      });
  });
});
