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
import {
  GARAGE_SIGN_UP,
  GET_USER_ACTION,
  LOGIN_ACTION,
  RESET_PASSSWORD_WITH_TOKEN,
  SEND_PASSWORD_TOKEN,
} from "./types";
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

export const sendPasswordResetInstruction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  { email: string }
>(SEND_PASSWORD_TOKEN, async (args) => {
  const response = await axiosClient.post(
    "/api/v1/send-password-reset-token",
    args
  );
  return response.data;
});

export const resetPasswordWithToken = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  { password: string; token: string }
>(RESET_PASSSWORD_WITH_TOKEN, async (args) => {
  const response = await axiosClient.post("/api/v1/password-reset", args);
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

  sendPasswordTokenStatus: IThunkAPIStatus;
  sendPasswordTokenSuccess: string;
  sendPasswordTokenError: string;

  resetPasswordWithTokenStatus: IThunkAPIStatus;
  resetPasswordWithTokenSuccess: string;
  resetPasswordWithTokenError: string;
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

  sendPasswordTokenStatus: "idle",
  sendPasswordTokenSuccess: "",
  sendPasswordTokenError: "",

  resetPasswordWithTokenStatus: "idle",
  resetPasswordWithTokenSuccess: "",
  resetPasswordWithTokenError: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearSendPasswordResetToken(state: IAuthState) {
      state.sendPasswordTokenStatus = "idle";
      state.sendPasswordTokenError = "";
      state.sendPasswordTokenSuccess = "";
    },
    clearResetPasswordWithToken(state: IAuthState) {
      state.resetPasswordWithTokenStatus = "idle";
      state.resetPasswordWithTokenError = "";
      state.resetPasswordWithTokenSuccess = "";
    },
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

    builder.addCase(sendPasswordResetInstruction.pending, (state, action) => {
      state.sendPasswordTokenStatus = "loading";
    });

    builder.addCase(sendPasswordResetInstruction.fulfilled, (state, action) => {
      state.sendPasswordTokenStatus = "completed";
      state.sendPasswordTokenSuccess = action.payload.message;
    });

    builder.addCase(sendPasswordResetInstruction.rejected, (state, action) => {
      state.sendPasswordTokenStatus = "failed";
      state.sendPasswordTokenError = action.payload?.message as string;
    });

    builder.addCase(resetPasswordWithToken.pending, (state, action) => {
      state.resetPasswordWithTokenStatus = "loading";
    });

    builder.addCase(resetPasswordWithToken.fulfilled, (state, action) => {
      state.resetPasswordWithTokenStatus = "completed";
      state.resetPasswordWithTokenSuccess = action.payload.message;
    });

    builder.addCase(resetPasswordWithToken.rejected, (state, action) => {
      state.resetPasswordWithTokenStatus = "failed";
      state.resetPasswordWithTokenError = action.payload?.message as string;
    });
  },
});

export const {
  clearLoginStatus,
  logoutAction,
  clearSignupStatus,
  clearSendPasswordResetToken,
  clearResetPasswordWithToken,
} = authSlice.actions;

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
