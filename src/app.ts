import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as session from "express-session";
import { userRouter } from "./routes/users.routes";
import { gamesRouter } from "./routes/games.routes";
import { authRouter } from "./routes/auth.routes";
import { setUpPassportStrategy } from "./config/passport";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    // Routes
    this.app.use("/user", userRouter);
    this.app.use("/auth", authRouter);
    this.app.use("/games", gamesRouter);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // set up session
    this.app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
      })
    );

    // set up passport auth
    setUpPassportStrategy(passport);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}

const app = new App().app;

export default app;
