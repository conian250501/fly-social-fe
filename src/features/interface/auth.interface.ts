import { IBaseTypes } from "../interface/IBaseTypes";
import { IFollow } from "./follow.interface";
import { IStorageTweet } from "./storageTweet.interface";
import { ITweet } from "./tweet.interface";
import { EGender, EUserRole } from "./user.interface";

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
  gender: EGender;
  phone: string;
  nickname: string;
  token: string;
  storageTweets: IStorageTweet[];
  tweets: ITweet[];
  website: string;
  birthDate: string;
  followers: IFollow[];
  followings: IFollow[];
  verified: boolean;
  role: EUserRole;
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
