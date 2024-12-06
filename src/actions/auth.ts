import { AxiosResponse } from "axios";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { ApiResponseSuccess, LoginDTO } from "@app-model";
import axiosClient from "../config/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const LOGIN = "auth:app:LOGIN";

// export const loginUserAction = asyncThunkWrapper<
//   ApiResponseSuccess<any>,
//   LoginDTO
// >(LOGIN, async (agrs: LoginDTO) => {
//   const response = await axiosClient.post<AxiosResponse<any>>(
//     "/api/v1/sign-in",
//     agrs
//   );

//   return response.data;
// });

export const loginUserAction = createAsyncThunk<
  ApiResponseSuccess<any>,
  LoginDTO,
  { rejectValue: string }
>("authSlice/loginUserAction", async (args: LoginDTO, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<any>("/api/v1/sign-in", args);
    return response.data;
  } catch (error) {
    // Handle error and return custom rejection value
    return rejectWithValue("Login failed");
  }
});
