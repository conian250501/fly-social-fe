import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const followUser = createAsyncThunk(
  "follow/create",
  async (userFollowedId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/follows`, { userFollowedId });
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "follow/delete",
  async (userFollowedId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.put(`/follows`, { userFollowedId });
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
