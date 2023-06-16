import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserById = createAsyncThunk(
  "user/get-by-id",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(`/users/${id}`);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);
