import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import queryString from "query-string";
import {
  IBaseFilter,
  IFilterGetUsers,
  IPayloadEditProfile,
  IPayloadUpdatePassword,
} from "@/features/interface";

export const getAllUsers = createAsyncThunk(
  "user-admin/get-all",
  async (
    { page = 1, limit = 4, name, status, verified }: IFilterGetUsers,
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        page: page,
        limit: limit,
        name: name || "",
        status: status || "",
        verified: verified || false,
      });
      const { data } = await axiosConfig.get(`/admin/users?${query}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user-admin/update",
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
  "user-admin/update",
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
