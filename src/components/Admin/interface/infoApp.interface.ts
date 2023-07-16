export enum ETypeTabInfoApp {
  Members = "Members",
  Tweets = "Tweets",
  Verified = "Verified",
}
export interface ITabInfoApp {
  id: string;
  type: ETypeTabInfoApp;
}
