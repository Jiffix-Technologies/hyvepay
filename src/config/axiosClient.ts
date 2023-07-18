import axios from "axios";
import { APP_BASE_URL } from "../contsants";
import { store } from "../store/store";
import { IAuthState } from "../reducers/authReducer";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = APP_BASE_URL;

console.log("baseUrl > ", APP_BASE_URL);

axios.interceptors.request.use((config: any) => {
  // grab current state
  let token = "";

  if (store) {
    const state = (store.getState() as any).authReducer as IAuthState;

    // alert((token))

    token =
      state?.userInfo?.access_token ||
      state.userInfo?.accessToken?.access_token ||
      (`${state.userInfo?.accessToken}` as string);
  }

  // get the JWT token out of it
  // const access_token = state?.session?.userData?.token;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export default axios;

// export default (() => {
//   axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.put["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.delete["Authorization"] = `Bearer ${token}`;

//   return axios;
// })();
