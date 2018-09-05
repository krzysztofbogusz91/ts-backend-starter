import app from "./app";
import { config } from "./config/app-config";

app.listen(config.port, () => {
    console.log('Express server listening on port ' + config.port);
})
