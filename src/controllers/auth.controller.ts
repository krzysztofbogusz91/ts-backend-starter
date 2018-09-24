import { Request, Response, NextFunction } from "express";
import * as passport from "passport";

class AuthController {
  public onUserLogin(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err, user) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).send({ msg: "wrong login or password" });
      }

      req.logIn(user, errLog => {
        if (errLog) return next(errLog);
        return res
          .status(200)
          .send({ msg: `user ${user._id} successfully login` });
      });
    })(req, res, next);
  }
}

export const controller = new AuthController();
