import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IPayloadComment } from "../interface/comment.interface";

export const commentTweet = createAsyncThunk(
  "comment/tweet/create",
  async ({ tweetId, content }: IPayloadComment, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/comments/${tweetId}`, {
        content,
      });
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const uploadFileComment = createAsyncThunk(
  "comment/upload-file",
  async ({ id, file }: { id: number; file: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/comments/upload/${id}`, file);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/update",
  async (
    { id, payload }: { id: number; payload: IPayloadComment },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosConfig.put(`/comments/${id}`, payload);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.delete(`/comments/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/like",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/comments/${id}/like`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const disLikeComment = createAsyncThunk(
  "comment/dislike",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/comments/${id}/dislike`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
