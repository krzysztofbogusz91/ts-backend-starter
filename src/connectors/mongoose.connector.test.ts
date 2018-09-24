import "mocha";
import * as sinon from "sinon";
import * as mongoose from "mongoose";

import { expect } from "chai";
import { config } from "../config/app-config";
import { connector } from "../connectors/mongoose.connector";

describe("MongooseConnector", () => {
  const spyMongooseConnect = sinon.stub(mongoose, "connect").callThrough();
  const spyMongooseDisconnect = sinon
    .stub(mongoose, "disconnect")
    .callThrough();
  const spyDropCollection = sinon
    .stub(mongoose.connection, "dropCollection")
    .callThrough();

  it("should create mongoose connection", done => {
    connector
      .openConnection(config.testDb)
      .then(() => done())
      .catch(err => done());
    expect(spyMongooseConnect.calledOnce).to.equal(true);
  });

  it("should drop database", done => {
    connector
      .dropDb("test")
      .then(() => done())
      .catch(err => done());
    expect(spyDropCollection.calledOnce).to.equal(true);
  });

  it("should disconnect from mongoose db", done => {
    connector
      .closeConnection()
      .then(() => done())
      .catch(err => done());

    expect(spyMongooseDisconnect.calledOnce).to.equal(true);
  });
});
