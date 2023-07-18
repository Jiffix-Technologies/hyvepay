import { IThunkAPIStatus, UserInfo } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { PURGE, REHYDRATE } from "redux-persist";
import { loginUserActionAction } from "../actions/authActions";

export interface IAuthState {
  userInfo: UserInfo | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  userInfo: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.userInfo = null;
    });
    builder.addCase(loginUserActionAction.pending, (state, action) => {
      //    state.accessToken = action.payload.result;
      //    console.log(action.payload);
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
