import axios from "axios";
import { APP_BASE_URL } from "../contsants";
import { IAuthState, store } from "../reducers/authReducer";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = APP_BASE_URL;

axios.interceptors.request.use((config: any) => {
  // grab current state
  let token = "";

  if (store) {
    const state = (store.getState() as any).authReducer as IAuthState;

    // alert((token))

    token = state?.accessToken || "";
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
