export interface IPayloadTweet {
  content: string;
  isPrivate: boolean;
  file: string | File | null;
}

export interface ITweet {
  content: string;
  isPrivate: boolean;
  file: string;
}
