import * as Express from "express";
import { controller } from "../controllers/user.controller";

const router = Express.Router();
router.post("/", controller.createUser.bind(controller));

export const userRouter = router;
