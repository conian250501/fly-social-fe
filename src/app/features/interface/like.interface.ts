import { IUser } from "./auth.interface";
import { IBaseTypes } from "./IBaseTypes";
import { ITweet } from "./tweet.interface";

export enum ETypeLike {
  Comment = "comment",
  Tweet = "tweet",
}
export interface ILike extends IBaseTypes {
  type: ETypeLike;
  user: IUser;
  tweet: ITweet;
  comment: any;
}
