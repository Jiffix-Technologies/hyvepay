declare module "@app-model" {
  interface ApiResponseError {
    message: string | string[];
    code: number;
    error: string;
    statusCode: number;
  }

  interface ApiResponseSuccess<T> {
    message: string;
    code: number;
    timestamp?: string;
    data: T;
    result?: T;
    results?: T[];
  }

  type IThunkAPIStatus = "idle" | "loading" | "completed" | "failed";

  interface UserInfo {
    access_token?: string;
    accessToken?: {
      access_token: string;
    };
  }

  interface LoginDTO {
    username: string;
    password: string;
  }
}
