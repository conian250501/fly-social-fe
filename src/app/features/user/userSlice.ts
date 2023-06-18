import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interface";
import {
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "./userAction";

export interface IInitialState {
  users: IUser[];
  user: IUser | null;
  usersFollowing: IUser[];
  usersFollower: IUser[];
}

const initialState: IInitialState = {
  user: null,
  users: [],
  usersFollower: [],
  usersFollowing: [],
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
  },
});

export default userSlice.reducer;
