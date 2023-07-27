import { createSlice } from "@reduxjs/toolkit";
import { IConversation } from "../interface";

export interface IInitialState {
  conversations: IConversation[];
  conversation: IConversation | null;
}

const initialState: IInitialState = {
  conversations: [],
  conversation: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default conversationSlice.reducer;
