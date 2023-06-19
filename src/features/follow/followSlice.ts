import { createSlice } from "@reduxjs/toolkit";
import { IFollow } from "../interface/follow.interface";

export interface IInitialState {
  follow: IFollow | null;
}
const initialState: IInitialState = {
  follow: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default followSlice.reducer;
