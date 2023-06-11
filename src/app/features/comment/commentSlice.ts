import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, IError } from "../interface";

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
  extraReducers(builder) {},
});
export default commentSlice.reducer;
