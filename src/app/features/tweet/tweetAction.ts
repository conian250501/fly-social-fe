import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPayloadTweet } from "../interface";
import { AxiosError } from "axios";
import axiosConfig from "@/config/axiosConfig";

export const create = createAsyncThunk(
  "tweet/create",
  async (payload: IPayloadTweet, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/tweets`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "tweet/upload",
  async ({ id, file }: { id: number; file: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/tweets/upload/${id}`, file);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const update = createAsyncThunk(
  "tweet/update",
  async (
    { id, payload }: { id: number; payload: IPayloadTweet },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.put(`/tweets/${id}`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAll = createAsyncThunk(
  "tweet/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/tweets`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getById = createAsyncThunk(
  "tweet/get-by-id",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/tweets/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
