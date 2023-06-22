import { IUser } from "./auth.interface";
import { IBaseTypes } from "./IBaseTypes";

export interface IFollow extends IBaseTypes {
  user: IUser;
  follower: IUser;
}
