import { IUser } from "./auth.interface";
import { IBaseTypes } from "./IBaseTypes";
import { ILike } from "./like.interface";
import { ITweet } from "./tweet.interface";

export enum ETypeComment {
  Tweet = "tweet",
  Comment = "comment",
}

export interface IComment extends IBaseTypes {
  content: string;
  image: string;
  video: string;
  user: IUser;
  type: ETypeComment;
  tweet: ITweet;
  likes: ILike[];
}

export interface IPayloadComment {
  content: string;
  file: string | File | null;
  tweetId: number;
}
