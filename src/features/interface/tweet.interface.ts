import { IBaseTypes } from "./IBaseTypes";
import { IUser } from "./auth.interface";
import { ILike } from "./like.interface";
import { IComment } from "./comment.interface";
import { IStorageTweet } from "./storageTweet.interface";
import { IBaseFilter } from "./filter.interface";

export enum ETweetStatus {
  New = "New",
  Archived = "Archived",
  Pinned = "Pinned",
}

export interface IFilterGetTweets extends IBaseFilter {
  status?: ETweetStatus;
}

export interface IPayloadTweet {
  content: string;
  isPrivate: boolean;
  file: string | File | null;
  status?: ETweetStatus;
}

export interface ITweet extends IBaseTypes {
  status: ETweetStatus;
  content: string;
  isPrivate: boolean;
  image: string;
  video: string;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
  storageTweets: IStorageTweet[];
}
