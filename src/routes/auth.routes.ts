import * as Express from "express";
import { controller } from "../controllers/auth.controller";

const router = Express.Router();

router.post("/login", controller.onUserLogin.bind(controller));

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.clearCookie("connect.sid");
    res.status(200).send({ msg: "user is logout" });
  });
});

export const authRouter = router;
