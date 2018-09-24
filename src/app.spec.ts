import "jasmine";
import * as request from "supertest";
import app from "./app";
import { config } from "./config/app-config";
import { connector } from "./connectors/mongoose.connector";

describe("App", () => {
  beforeEach(() => {
    spyOn(app, "use");
  });
  beforeAll(done => {
    connector
      .openConnection(config.testDb)
      .then(done)
      .catch(done);
  });

  it("should check if app exists", () => {
    expect(app).toBeTruthy();
  });

  it("should check if app have ability to create paths", () => {
    app.use("/test");
    expect(app.use).toHaveBeenCalled();
    expect(app.use).toHaveBeenCalledWith("/test");
  });

  it("should return 404 when wrong url is called", done => {
    request(app)
      .post(`/wrong_url`)
      .then(resp => {
        expect(resp.status).toEqual(404);
        done();
      })
      .catch(() => done());
  });
});
