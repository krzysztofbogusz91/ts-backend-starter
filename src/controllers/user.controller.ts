import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { UserService } from './../services/user.service';
import { IUser } from './../models/user.interface';

class UserController {
  constructor(private userService: UserService) {}

  public createUser(req, res): Promise<IUser> {
    const newUser = new User(req.body);

    return this.userService
      .create(newUser)
      .then((user: IUser) => res.status(200).send({ msg: 'user created' }))
      .catch(err => res.status(500).send({ msg: 'failed to create user' }));
  }
}
const service = new UserService();
export const controller = new UserController(service);
