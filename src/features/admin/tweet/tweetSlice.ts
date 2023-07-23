import { ITweet } from "@/features/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllTweets, getTweetById } from "./tweetAction";

export interface IInitialState {
  tweets: ITweet[];
  tweet: ITweet | null;
  page: number;
  totalPage: number;
}

const initialState: IInitialState = {
  tweets: [],
  tweet: null,
  page: 0,
  totalPage: 0,
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // ====== GET ALL ======
    builder.addCase(
      getAllTweets.fulfilled,
      (
        state,
        action: PayloadAction<{
          tweets: ITweet[];
          page: number;
          totalPage: number;
        }>
      ) => {
        state.tweets = action.payload.tweets;
        state.page = action.payload.page;
        state.totalPage = action.payload.totalPage;
      }
    );

    // ====== GET DETAIL ======
    builder.addCase(
      getTweetById.fulfilled,
      (state, action: PayloadAction<ITweet>) => {
        state.tweet = action.payload;
      }
    );
  },
});

export default tweetSlice.reducer;
