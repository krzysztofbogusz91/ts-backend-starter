import * as mongoose from "mongoose";

class MongooseConnector {
  public openConnection(database) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          database,
          {
            useNewUrlParser: true
          }
        )
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  public closeConnection() {
    return mongoose.disconnect();
  }

  public dropDb(dataBaseName: string) {
    return mongoose.connection.dropCollection(dataBaseName);
  }
}

export const connector = new MongooseConnector();
