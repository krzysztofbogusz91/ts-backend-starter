import { IUser } from '../models/user.interface';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserService {
  public create(user): Promise<IUser> {
    user.password = bcrypt.hashSync(user.password, 10);
    return user.save();
  }
  public getUser(query): any {
    return User.findOne(query)
  }
}
