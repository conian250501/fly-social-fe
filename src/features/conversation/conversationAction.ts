import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IBaseFilter } from "../interface";
import queryString from "query-string";

export const getAllConversation = createAsyncThunk(
  "conversation/get-all",
  async (
    { senderId, filter }: { senderId: number; filter: IBaseFilter },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 4,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(
        `/conversations/${senderId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
