import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IPayloadEditProfile } from "../interface";

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
