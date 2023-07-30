import { IUser } from "@/features/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, getUserById } from "./userAction";

export interface IInitialState {
  users: IUser[];
  user: IUser | null;
  page: number;
  totalPage: number;
  archiveSuccess: boolean;
}

const initialState: IInitialState = {
  user: null,
  users: [],
  page: 0,
  totalPage: 0,
  archiveSuccess: false,
};

const userSlice = createSlice({
  name: "admin-user",
  initialState,
  reducers: {
    archiveUserSuccess: (state) => {
      state.archiveSuccess = true;
    },
    clearArchiveUserSuccess: (state) => {
      state.archiveSuccess = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(
      getAllUsers.fulfilled,
      (
        state,
        action: PayloadAction<{
          users: IUser[];
          page: number;
          totalPage: number;
        }>
      ) => {
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.totalPage = action.payload.totalPage;
      }
    );
  },
});

export const { archiveUserSuccess, clearArchiveUserSuccess } =
  userSlice.actions;

export default userSlice.reducer;
