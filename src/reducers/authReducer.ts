import {
  ApiResponseSuccess,
  IThunkAPIStatus,
  LoginDTO,
  UserInfo,
  IUserData,
  IGarageSignupModel,
} from "@app-model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE, REHYDRATE } from "redux-persist";
import axiosClient from "../config/axiosClient";
import { GARAGE_SIGN_UP, GET_USER_ACTION, LOGIN_ACTION } from "./types";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { AxiosResponse } from "axios";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bankReducer from "../reducers/bankReducer";

export const loginUserAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  LoginDTO
>(LOGIN_ACTION, async (agrs: LoginDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/v1/sign-in",
    agrs
  );

  return response.data;
});

export const getUserAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  number
>(GET_USER_ACTION, async (id) => {
  const response = await axiosClient.get(`/api/v1/users/${id}`);

  return response.data;
});

export const garageSignUpAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IGarageSignupModel
>(GARAGE_SIGN_UP, async (args) => {
  const response = await axiosClient.post("/api/v1/garage-sign-up", args);
  return response.data;
});

export interface IAuthState {
  userInfo: IUserData | null;
  accessToken: string | null;
  loginStatus: IThunkAPIStatus;
  loginSuccess: string;
  loginError: string;

  signupStatus: IThunkAPIStatus;
  signupSuccess: string;
  signupError: string;

  getUserStatus: IThunkAPIStatus;
  getUserSuccess: string;
  getUserError: string;
}

const initialState: IAuthState = {
  userInfo: null,
  accessToken: null,
  loginStatus: "idle",
  loginSuccess: "",
  loginError: "",

  getUserStatus: "idle",
  getUserSuccess: "",
  getUserError: "",

  signupStatus: "idle",
  signupSuccess: "",
  signupError: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearLoginStatus(state: IAuthState) {
      state.loginStatus = "idle";
      state.loginSuccess = "";
      state.loginError = "";
    },
    clearSignupStatus(state: IAuthState) {
      state.signupStatus = "idle";
      state.signupSuccess = "";
      state.signupError = "";
    },
    logoutAction(state: IAuthState) {
      state.loginStatus = "idle";
      state.loginSuccess = "";
      state.loginError = "";

      state.accessToken = "";
      state.userInfo = null;

      window.location.replace("/");
    },
  },

  extraReducers: (builder) => {
    // Use dynamic import to avoid circular dependency
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loginStatus = "loading";
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loginStatus = "completed";
      state.accessToken = action.payload.result;
      console.log(action.payload);
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.payload?.message as string;
    });

    builder.addCase(getUserAction.pending, (state, action) => {
      state.getUserStatus = "loading";
    });

    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.getUserStatus = "completed";
      state.userInfo = action.payload.result as IUserData;
    });

    builder.addCase(getUserAction.rejected, (state, action) => {
      state.getUserStatus = "failed";
      state.getUserError = action.payload?.message as string;
    });

    builder.addCase(garageSignUpAction.pending, (state, action) => {
      state.signupStatus = "loading";
    });

    builder.addCase(garageSignUpAction.fulfilled, (state, action) => {
      state.signupStatus = "completed";
      state.signupSuccess = action.payload.message;
    });

    builder.addCase(garageSignUpAction.rejected, (state, action) => {
      state.signupStatus = "failed";
      state.signupError = action.payload?.message as string;
    });
  },
});

export const { clearLoginStatus, logoutAction, clearSignupStatus } =
  authSlice.actions;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"], // <-- Corrected property name here
};

const reducers = combineReducers({
  authReducer: authSlice.reducer,
  bankReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // ...
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
