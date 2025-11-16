import mongoose from "mongoose";
import { UserEntity } from "../../../domain";

const userSchema = new mongoose.Schema<UserEntity>({

  name: {
    type: String,
    required: [ true, 'Name is required' ]
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ]
  },
  img: {
    type: String,
  },
  roles: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    required: [ true, 'Roles are required' ] }
});

export const UserModel = mongoose.model<UserEntity>('User', userSchema);