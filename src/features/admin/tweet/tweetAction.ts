import axiosConfig from "@/config/axiosConfig";
import { IBaseFilter } from "@/features/interface";
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
