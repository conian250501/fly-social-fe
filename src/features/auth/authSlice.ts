import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interface";
import { IError } from "../interface/IError";
import { getUser, login, register, verifyToken } from "./authAction";

interface IInitialState {
  loading: boolean;
  user: IUser | null;
  error: IError | null;
  isExpiredToken: boolean;
}

const initialState: IInitialState = {
  loading: false,
  user: null,
  error: null,
  isExpiredToken: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ====== REGISTER ======
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    });

    // ====== LOGIN ======
    builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    });

    // ====== GET USER ======
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
    });

    // ============ VERIFY TOKEN ==========
    builder.addCase(verifyToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      verifyToken.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(
      verifyToken.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isExpiredToken = true;
      }
    );
  },
});

export const { clearError, setError } = authSlice.actions;

export default authSlice.reducer;
