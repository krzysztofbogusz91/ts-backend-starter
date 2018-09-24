import "jasmine";
import * as mongoose from "mongoose";
import { config } from "../config/app-config";
import { connector } from "./mongoose.connector";

describe("MongooseConnector", () => {
  beforeAll(() => {
    spyOn(mongoose, "connect").and.callThrough();
    spyOn(mongoose, "disconnect");
    spyOn(mongoose.connection, "dropCollection");
  });

  it("should create mongoose connection", () => {
    connector.openConnection(config.testDb);
    expect(mongoose.connect).toHaveBeenCalled();
  });

  it("should disconnect from mongoose db", () => {
    connector.closeConnection();
    expect(mongoose.disconnect).toHaveBeenCalled();
  });

  it("should disconnect from mongoose db", () => {
    connector.dropDb("test");
    expect(mongoose.connection.dropCollection).toHaveBeenCalled();
  });
});
