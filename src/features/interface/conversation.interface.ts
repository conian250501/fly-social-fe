import { IBaseTypes } from "./IBaseTypes";
import { IUser } from "./auth.interface";

export interface IConversation extends IBaseTypes {
  sender: IUser;
  receiver: IUser;
}
