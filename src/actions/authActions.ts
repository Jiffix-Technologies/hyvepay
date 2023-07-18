import { AxiosResponse } from "axios";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { ApiResponseSuccess, LoginDTO } from "@app-model";
import axiosClient from "../config/axiosClient";

const LOGIN = "auth:LOGIN";

export const loginUserActionAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  LoginDTO
>(LOGIN, async (agrs: LoginDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/v1/sign-in",
    agrs
  );

  return response.data;
});
