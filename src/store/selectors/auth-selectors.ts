import {RootState} from "../store";

export const authStateSelector = (state: RootState) => state.auth;
export const authUserSelector = (state: RootState) => state.auth.user;
export const authRequestStatusSelector = (state: RootState) => state.auth.status;
export const authErrorSelector = (state: RootState) => state.auth.error;

