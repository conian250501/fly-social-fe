import { createSlice } from "@reduxjs/toolkit";
import { IStorageTweet } from "../interface";

export interface IInitialState {
  storageTweet: IStorageTweet | null;
}

const initialState: IInitialState = {
  storageTweet: null,
};

const storageSlice = createSlice({
  name: "storage-tweet",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default storageSlice.reducer;
