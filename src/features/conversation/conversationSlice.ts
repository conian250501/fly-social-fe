import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConversation } from "../interface";
import { getConversationById } from "./conversationAction";

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
  extraReducers(builder) {
    builder.addCase(
      getConversationById.fulfilled,
      (state, action: PayloadAction<IConversation>) => {
        state.conversation = action.payload;
      }
    );
  },
});

export default conversationSlice.reducer;
