import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import tweetReducer from "../features/tweet/tweetSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  tweet: tweetReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
