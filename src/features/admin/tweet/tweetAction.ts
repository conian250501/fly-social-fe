import axiosConfig from "@/config/axiosConfig";
import { IBaseFilter, IPayloadTweet } from "@/features/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import queryString from "query-string";

export const getAllTweets = createAsyncThunk(
  "admin-tweet/get-all",
  async (filter: IBaseFilter, { rejectWithValue }) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 4,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(`/admin/tweets?${query}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getTweetById = createAsyncThunk(
  "admin-tweet/get-by-id",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/admin/tweets/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteTweet = createAsyncThunk(
  "admin-tweet/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.delete(`/admin/tweets/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const uploadFileTweet = createAsyncThunk(
  "admin-tweet/upload",
  async ({ id, file }: { id: number; file: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(
        `/admin/tweets/upload/${id}`,
        file
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateTweet = createAsyncThunk(
  "admin-tweet/update",
  async (
    {
      id,
      payload,
    }: {
      id: number;
      payload: { content: string; image: string | null | File };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.put(`/admin/tweets/${id}`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
