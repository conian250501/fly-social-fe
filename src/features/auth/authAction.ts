import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPayloadLogin, IPayloadRegister } from "../interface";
import axiosConfig from "@/config/axiosConfig";
import axios, { AxiosError } from "axios";

export const register = createAsyncThunk(
  "auth/sign-up",
  async (payload: IPayloadRegister, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/auth/sign-up`, payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/sign-in",
  async (payload: IPayloadLogin, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/auth/sign-in`, payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/auth/get-user`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginByGoogle = createAsyncThunk(
  "auth/google",
  async (payload: { access_token: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post("/auth/google", payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginByFacebook = createAsyncThunk(
  "auth/facebook",
  async (payload: { access_token: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post("/auth/facebook", payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAccessTokenGithub = createAsyncThunk(
  "auth/github/access-token",
  async (code: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(
        `/auth/github/access-token?code=${code}`
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginByGithub = createAsyncThunk(
  "auth/github",
  async (payload: { access_token: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/auth/github`, payload);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/auth/forgot-password`, {
        email,
      });
      return data.data.message;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post(`/auth/reset-password`, payload, {
        headers: {
          Authorization: "Bearer " + payload.token,
        },
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verify-token",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.post("/auth/verify-token", { token });
      return data.data.user;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
