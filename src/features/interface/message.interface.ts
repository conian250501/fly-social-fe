import { IBaseTypes } from "./IBaseTypes";
import { IUser } from "./auth.interface";
import { IConversation } from "./conversation.interface";

export interface IMessage extends IBaseTypes {
  content: string;
  author: IUser;
  conversation: IConversation;
  file: string;
}
