import 'mocha';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';

import { expect } from 'chai';
import { config } from '../config/app-config';
import { connector } from '../connectors/mongoose.connector';

describe('MongooseConnector', () => {
  const spyMongooseDisconnect = sinon.spy(mongoose, 'disconnect');
  const spyDropCollection = sinon.spy(mongoose.connection, 'dropCollection');
  const spyMongooseConnect = sinon.spy(mongoose, 'connect');
  it('should create mongoose connection', async () => {
    await connector.openConnection(config.testDb);
    expect(spyMongooseConnect.calledOnce).to.equal(true);
    spyMongooseConnect.restore();
  });
  it('should drop database', async () => {
    await connector.dropDb('').catch(err => err);
    expect(spyDropCollection.calledOnce).to.equal(true);
    spyDropCollection.restore();
  });
  it('should disconnect from mongoose db', async () => {
    await connector.closeConnection();
    expect(spyMongooseDisconnect.calledOnce).to.equal(true);
    spyMongooseDisconnect.restore();
  });
});
