import { useDispatch } from "react-redux";
import { store } from "../reducers/authReducer";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
