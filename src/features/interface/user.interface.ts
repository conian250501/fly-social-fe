import { IBaseFilter } from "./filter.interface";

export interface IPayloadEditProfile {
  cover?: string | File | null;
  avatar?: string | File | null;
  name: string;
  nickname: string;
  bio?: string;
  address: string;
  website?: string;
  birthDate: string;
  phone?: string;
  gender?: EGender;
  status?: EUserStatus;
  role?: EUserRole;
}
export interface IFilterGetUsers extends IBaseFilter {
  name?: string;
  status?: EUserStatus | string;
  verified?: boolean;
}

export interface IPayloadUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export enum EGender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum EUserRole {
  User = "User",
  Admin = "Admin",
}

export enum EUserStatus {
  Active = "Active",
  InActive = "InActive",
}
