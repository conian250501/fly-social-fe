import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./interface";
import IError from "../interface/IError";
import { getUser, login, register } from "./authAction";

interface IInitialState {
  loading: boolean;
  user: IUser | null;
  error: IError | null;
}

const initialState:IInitialState = {
  loading: false,
  user: null,
  error: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state,action:PayloadAction<IUser>) => {
      state.user = action.payload
    });
    builder.addCase(register.rejected, (state,action:PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    });

    builder.addCase(login.fulfilled, (state,action:PayloadAction<IUser>) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state,action:PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    });

    builder.addCase(getUser.fulfilled, (state,action:PayloadAction<IUser>) => {
      state.user = action.payload
    });
    builder.addCase(getUser.rejected, (state,action:PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    })
  }
});

export const {clearError,setError} = authSlice.actions

export default authSlice.reducer