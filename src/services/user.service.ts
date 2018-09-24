import * as bcrypt from "bcrypt";
import { DocumentQuery } from "mongoose";
import { IUser } from "../models/user.interface";
import { User } from "../models/user.model";

export class UserService {
  public create(user): Promise<IUser> {
    user.password = bcrypt.hashSync(user.password, 10);
    return user.save();
  }
  public getUser(query): DocumentQuery<any, IUser> {
    return User.findOne(query);
  }
}
