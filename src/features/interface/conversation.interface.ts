import { IBaseTypes } from "./IBaseTypes";
import { IUser } from "./auth.interface";
import { IMessage } from "./message.interface";

export interface IConversation extends IBaseTypes {
  participants: IUser[];
  messages: IMessage[];
  isGroup: boolean;
  groupName: string;
}
