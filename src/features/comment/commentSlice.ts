import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, IError } from "../interface";
import { create } from "../tweet/tweetAction";
import { getAllByTweet } from "./commentAction";

export interface IInitialState {
  commentsForTweet: IComment[];
  commentForTweet: IComment | null;
  error: IError | null;
}

const initialState: IInitialState = {
  commentForTweet: null,
  commentsForTweet: [],
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
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
    builder.addCase(
      getAllByTweet.fulfilled,
      (state, action: PayloadAction<IComment[]>) => {
        state.commentsForTweet = action.payload;
      }
    );

    builder.addCase(
      create.fulfilled,
      (state, action: PayloadAction<IComment>) => {
        state.commentsForTweet.unshift(action.payload);
        console.log(state.commentsForTweet);
      }
    );
  },
});
export default commentSlice.reducer;
