import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interface";
import {
  getAllUserDontFollowing,
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "./userAction";

export interface IInitialState {
  users: IUser[];
  user: IUser | null;
  usersFollowing: IUser[];
  usersFollower: IUser[];
  usersFollowedYet: IUser[];
  page: number;
  totalPage: number;
}

const initialState: IInitialState = {
  user: null,
  users: [],
  usersFollower: [],
  usersFollowing: [],
  usersFollowedYet: [],
  page: 0,
  totalPage: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      }
    );

    builder.addCase(
      getAllUserFollowing.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.usersFollowing = action.payload;
      }
    );
    builder.addCase(
      getAllUserFollowers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.usersFollower = action.payload;
      }
    );
    builder.addCase(
      getAllUserDontFollowing.fulfilled,
      (
        state,
        action: PayloadAction<{
          users: IUser[];
          totalPage: number;
          page: number;
        }>
      ) => {
        state.usersFollowedYet = action.payload.users;
        state.page = action.payload.page;
        state.totalPage = action.payload.totalPage;
      }
    );
  },
});

export default userSlice.reducer;
