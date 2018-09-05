import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { UserService } from './../services/user.service';
import { IUser } from './../models/user.interface';
import * as bcrypt from 'bcrypt';

class AuthController {
  constructor(private userService: UserService) {}

  public onUserLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    return this.userService
      .getUser({ email })
      .then((user: IUser) => {
        const match = bcrypt.compareSync(password, user.password);

        return match
          ? res.status(200).send({ msg: `user ${user._id} successfully login` })
          : res.status(401).send({ msg: 'invalid email' });
      })
      .catch(err => res.status(404).send({ msg: 'invalid credentials' }));
  }
}
const service = new UserService();
export const controller = new AuthController(service);
