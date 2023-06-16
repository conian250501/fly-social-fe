import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interface";
import { getUserById } from "./userAction";

export interface IInitialState {
  users: IUser[];
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
  users: [],
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
  },
});

export default userSlice.reducer;
