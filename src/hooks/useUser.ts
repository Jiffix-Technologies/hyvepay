import useAppSelector from "./useAppSelector";
import {
  IAuthState,
  getUserAction,
  logoutAction,
} from "../reducers/authReducer";
import { useCallback, useEffect, useState } from "react";
import useAppDispatch from "./useAppDispatch";
import jwt from "jwt-decode";
import { CustomJwtPayload } from "@app-model";
import { useNavigate } from "react-router-dom";
import { IUserData } from "@app-model";

export const useUser = () => {
  const authState = useAppSelector(
    (state: any) => state.authReducer
  ) as IAuthState;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    if (authState.getUserStatus === "completed") {
      setUser(authState.userInfo);
    }
  }, [authState.getUserStatus]);

  const getUserDetail = useCallback(() => {
    try {
      if (authState.accessToken && authState.accessToken.trim() !== "") {
        const payload: CustomJwtPayload = jwt(authState.accessToken);

        dispatch(getUserAction(payload.userId));
      } else {
        dispatch(logoutAction());
      }
    } catch (error) {
      console.log(error);
      dispatch(logoutAction());
    }
  }, [authState.accessToken]);

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

  return { user };
};
