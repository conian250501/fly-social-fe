import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../interface";

export interface IInitialState {
  messages: IMessage[];
  message: IMessage | null;
}

const initialState: IInitialState = {
  message: null,
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default messageSlice.reducer;
