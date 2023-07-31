import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IBaseFilter } from "../interface";
import queryString from "query-string";

export const getAllConversation = createAsyncThunk(
  "conversation/get-all",
  async (
    { userId, filter }: { userId: number; filter: IBaseFilter },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 4,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(
        `/conversations/user/${userId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const newConversation = createAsyncThunk(
  "conversation/new",
  async (
    { participantIds }: { participantIds: number[] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.post(`/conversations/`, {
        participantIds,
      });
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getConversationById = createAsyncThunk(
  "conversation/get-by-id",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/conversations/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
