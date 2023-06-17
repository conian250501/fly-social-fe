export enum ETypeTabTweetList {
  ForYou = "For you",
  Following = "Following",
}

export interface ITabTweetList {
  id: string;
  type: ETypeTabTweetList;
}
