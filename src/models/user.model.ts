import { Schema, Model, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User: Model<IUser> = model<IUser>('User', userSchema)
