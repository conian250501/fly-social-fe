import { IUser } from "./auth.interface";
import { IBaseTypes } from "./IBaseTypes";
import { ITweet } from "./tweet.interface";

export interface IStorageTweet extends IBaseTypes {
  user: IUser;
  tweet: ITweet;
}

export interface IPayloadSaveTweet {
  tweetId: number;
}
