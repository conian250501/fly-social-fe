import { IBaseTypes } from "./IBaseTypes";
import { IUser } from "./auth.interface";
import { ILike } from "./like.interface";
import { IComment } from "./comment.interface";

export interface IPayloadTweet {
  content: string;
  isPrivate: boolean;
  file: string | File | null;
}

export interface ITweet extends IBaseTypes {
  content: string;
  isPrivate: boolean;
  image: string;
  video: string;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
}
