import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import queryString from "query-string";
import {
  IBaseFilter,
  IFilterGetUsers,
  IPayloadEditProfile,
  IPayloadUpdatePassword,
} from "../interface";

export const getAllUsers = createAsyncThunk(
  "user/get-all",
  async ({ page, limit, name }: IFilterGetUsers, { rejectWithValue }) => {
    try {
      const query = queryString.stringify({
        page: page,
        limit: limit,
        name: name || "",
      });
      const { data } = await axiosConfig.get(`/users?${query}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/get-by-id",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/users/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getAllUserFollowing = createAsyncThunk(
  "user/get-all-following",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/users/followings/${userId}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllUserFollowers = createAsyncThunk(
  "user/get-all-followers",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/users/followers/${userId}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (
    { id, payload }: { id: number; payload: IPayloadEditProfile },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.put(`/users/${id}`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const uploadFilesProfile = createAsyncThunk(
  "user/update",
  async (
    { id, files }: { id: number; files: FormData },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.post(`/users/upload/${id}`, files);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllUserDontFollowing = createAsyncThunk(
  "user/get-all-dont-following",
  async (
    { userId, filter }: { userId: number; filter: IFilterGetUsers },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        page: filter.page || 1,
        limit: filter.limit || 4,
        name: filter.name || "",
      });
      const { data } = await axiosConfig.get(
        `/users/followed-yet/${userId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/update-password",
  async (
    { userId, payload }: { userId: number; payload: IPayloadUpdatePassword },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.put(
        `/users/update-password/${userId}`,
        payload
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
