import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IError, ITweet } from "../interface";
import { create, getAll, getById } from "./tweetAction";

export interface IInitialState {
  tweets: ITweet[];
  tweet: ITweet | null;
  error: IError | null;
}

const initialState: IInitialState = {
  tweets: [],
  tweet: null,
  error: null,
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    // ====== CREATE ======
    builder.addCase(
      create.fulfilled,
      (state, action: PayloadAction<ITweet>) => {
        state.tweet = action.payload;
      }
    );

    // ====== GET ALL ======
    builder.addCase(
      getAll.fulfilled,
      (state, action: PayloadAction<ITweet[]>) => {
        state.tweets = action.payload;
      }
    );

    // ====== GET DETAIL ======
    builder.addCase(
      getById.fulfilled,
      (state, action: PayloadAction<ITweet>) => {
        state.tweet = action.payload;
      }
    );
  },
});

export const { setError, clearError } = tweetSlice.actions;

export default tweetSlice.reducer;
