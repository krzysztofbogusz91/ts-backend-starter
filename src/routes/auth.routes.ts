import * as Express from "express";
import { controller } from "../controllers/auth.controller";

const router = Express.Router();

router.post("/login", controller.onUserLogin.bind(controller));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/games");
});

export const authRouter = router;
