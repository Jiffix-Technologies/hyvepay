export const APP_BASE_URL = import.meta.env.VITE_BASE_URL;
export const PASSWORD_PATTERN =
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&+=])(?=\\S+$).{8,20}$";

export enum postingType {
  credit = 2,
  debit = 1,
}
