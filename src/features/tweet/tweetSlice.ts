import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IError, ITweet } from "../interface";
import { create, getAll, getAllTweetByUser, getById } from "./tweetAction";

export interface IInitialState {
  tweets: ITweet[];
  tweetsOfUser: ITweet[];
  tweet: ITweet | null;
  error: IError | null;
  isDeleted: boolean;
  page: number;
  totalPage: number;
}

const initialState: IInitialState = {
  tweets: [],
  tweetsOfUser: [],
  tweet: null,
  error: null,
  isDeleted: false,
  page: 0,
  totalPage: 0,
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
    deleteTweetSuccess: (state) => {
      state.isDeleted = true;
    },
    clearIsDeleted: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers(builder) {
    // ====== CREATE ======
    builder.addCase(
      create.fulfilled,
      (state, action: PayloadAction<ITweet>) => {
        state.tweet = action.payload;
        state.tweets.unshift(action.payload);
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

    // ====== GET ALL BY USER =====
    builder.addCase(
      getAllTweetByUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          tweets: ITweet[];
          page: number;
          totalPage: number;
        }>
      ) => {
        state.totalPage = action.payload.totalPage;
        state.page = action.payload.page;
        state.tweetsOfUser = action.payload.tweets;
      }
    );
  },
});

export const { setError, clearError, deleteTweetSuccess, clearIsDeleted } =
  tweetSlice.actions;

export default tweetSlice.reducer;
