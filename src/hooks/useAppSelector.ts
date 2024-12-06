import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducers/authReducer";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
