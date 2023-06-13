import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IPayloadSaveTweet } from "../interface";

export const saveTweet = createAsyncThunk(
  "storage-tweet/save",
  async (payload: IPayloadSaveTweet, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/storage-tweets`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const unSaveTweet = createAsyncThunk(
  "storage-tweet/unSave",
  async ({ tweetId }: IPayloadSaveTweet, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.delete(`/storage-tweets/${tweetId}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
