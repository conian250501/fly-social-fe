import { IBaseTypes } from "../interface/IBaseTypes";
import { IStorageTweet } from "./storageTweet.interface";
import { ITweet } from "./tweet.interface";

export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IUser extends IBaseTypes {
  avatar: string;
  cover: string;
  bio: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  nickname: string;
  token: string;
  storageTweets: IStorageTweet[];
  tweets: ITweet[];
}

export interface IPayloadResetPass {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export enum UserRole {
  User = "user",
  Admin = "admin",
}
