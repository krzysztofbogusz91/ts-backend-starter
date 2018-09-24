import app from "./app";
import { config } from "./config/app-config";
import { connector } from "./connectors/mongoose.connector";

connector
  .openConnection(config.db)
  .then(() => {
    console.log("connection established");
    app.listen(config.port, () => {
      console.log("Express server listening on port " + config.port);
    });
  })
  .catch((error) => {
    console.log("Error while attempting to connect to MongoDB", error);
    process.exit(1);
  });
