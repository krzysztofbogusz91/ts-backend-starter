import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "./../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  public createUser(req: Request, res: Response): Promise<Response> {
    return this.userService
      .create(new User(req.body))
      .then(() => res.status(200).send({ msg: "user created" }))
      .catch(() => res.status(500).send({ msg: "failed to create user" }));
  }
}
const service = new UserService();
export const controller = new UserController(service);
