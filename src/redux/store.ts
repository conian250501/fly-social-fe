import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import commentReducer from "@/features/comment/commentSlice";
import followReducer from "@/features/follow/followSlice";
import storageTweetReducer from "@/features/storageTweet/storageTweetSlice";
import tweetReducer from "@/features/tweet/tweetSlice";
import userReducer from "@/features/user/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tweet: tweetReducer,
  comment: commentReducer,
  storage: storageTweetReducer,
  user: userReducer,
  follow: followReducer,
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
