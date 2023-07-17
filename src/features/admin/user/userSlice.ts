import { IUser } from "@/features/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "./userAction";

export interface IInitialState {
  users: IUser[];
  user: IUser | null;
  page: number;
  totalPage: number;
}

const initialState: IInitialState = {
  user: null,
  users: [],
  page: 0,
  totalPage: 0,
};

const userSlice = createSlice({
  name: "admin-user",
  initialState,
  reducers: {},
  extraReducers(builder) {
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

export default userSlice.reducer;
