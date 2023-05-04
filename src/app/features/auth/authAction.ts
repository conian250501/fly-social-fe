import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPayloadLogin, IPayloadRegister } from "./interface";
import axiosConfig from "@/config/axiosConfig";

export const register = createAsyncThunk("auth/sign-up", async (payload:IPayloadRegister, {rejectWithValue}) => {
  try {
    const {data} = await axiosConfig.post(`/auth/sign-up`, payload);
    return data.data
  } catch (error:any) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("auth/sign-in", async (payload:IPayloadLogin, {rejectWithValue}) => {
  try {
    const {data} = await axiosConfig.post(`/auth/sign-in`, payload);
    return data.data
  } catch (error:any) {
    return rejectWithValue(error.response.data);
  }
})

export const getUser = createAsyncThunk("auth/get-user", async (_, {rejectWithValue}) => {
  try {
    const {data} = await axiosConfig.get(`/auth/get-user`);
    return data.data
  } catch (error:any) {
    return rejectWithValue(error.response.data);
  }
});

export const loginByGoogle = createAsyncThunk(
  "auth/google", 
  async(payload:{access_token:string}, {rejectWithValue}) => {
    try {
      const {data} = await axiosConfig.post("/auth/google", payload);
      return data.data
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  } 
)