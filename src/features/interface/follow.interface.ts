import { IUser } from "./auth.interface";
import { IBaseTypes } from "./IBaseTypes";

export interface IFollow extends IBaseTypes {
  follower: IUser;
  following: IUser;
}
