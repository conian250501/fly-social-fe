import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBaseFilter, IPayloadTweet } from "../interface";
import { AxiosError } from "axios";
import axiosConfig from "@/config/axiosConfig";
import queryString from "query-string";

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

export const deleteTweet = createAsyncThunk(
  "tweet/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.delete(`/tweets/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const likeTweet = createAsyncThunk(
  "tweet/like",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/tweets/${id}/like`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const disLikeTweet = createAsyncThunk(
  "tweet/dislike",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/tweets/${id}/dislike`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllTweetByUser = createAsyncThunk(
  "tweet/get-all-by-user",
  async (
    { userId, filter }: { userId: number; filter: IBaseFilter },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 2,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(
        `/tweets/get-by-user/${userId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllTweetsSaved = createAsyncThunk(
  "tweet/get-all-saved",
  async (
    { userId, filter }: { userId: number; filter: IBaseFilter },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 2,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(
        `/tweets/saved/${userId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getAllTweetsLiked = createAsyncThunk(
  "tweet/get-all-liked",
  async (
    { userId, filter }: { userId: number; filter: IBaseFilter },
    { rejectWithValue }
  ) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 2,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(
        `/tweets/liked/${userId}?${query}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getAllTweetsFollowing = createAsyncThunk(
  "tweet/get-all-following",
  async ({ filter }: { filter: IBaseFilter }, { rejectWithValue }) => {
    try {
      const query = queryString.stringify({
        limit: filter.limit || 2,
        page: filter.page || 1,
      });
      const { data } = await axiosConfig.get(`/tweets/following?${query}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
