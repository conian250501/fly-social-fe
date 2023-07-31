import axiosConfig from "@/config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllMessageByConversation = createAsyncThunk(
  "message/get-all-by-conversation",
  async (conversationId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosConfig.get(
        `/messages/conversation/${conversationId}`
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err.response?.data);
    }
  }
);
