export enum ETypeTabProfile {
  Tweets = "Tweets",
  Likes = "Likes",
  Saved = "Saved",
}
export interface ITabProfile {
  id: string;
  type: ETypeTabProfile;
  link: string;
}
