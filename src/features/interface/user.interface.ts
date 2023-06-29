import { IBaseFilter } from "./filter.interface";

export interface IPayloadEditProfile {
  cover: string;
  avatar: string;
  name: string;
  nickname: string;
  bio: string;
  address: string;
  website: string;
  birthDate: string;
}
export interface IFilterGetUsers extends IBaseFilter {
  name?: string;
}
