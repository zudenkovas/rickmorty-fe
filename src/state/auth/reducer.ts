import { createReducer } from '@reduxjs/toolkit';
import { FetchingStatus } from 'commons/enums';

import { signIn, signUp, signOut, persistAuth } from './actions';
import { SignInResponse } from './types';

export type AuthState = {
  isLoggedIn: boolean;
  userData: SignInResponse | null;
  signInStatus: FetchingStatus;
  signUpStatus: FetchingStatus;
  error?: string;
};

const initialState: AuthState = {
  isLoggedIn: false,
  userData: null,
  signInStatus: FetchingStatus.INITIAL,
  signUpStatus: FetchingStatus.INITIAL,
  error: undefined,
};

export const authReducer = createReducer(
  initialState,

  (builder) => {
    builder
      .addCase(signUp.pending, (state) => ({
        ...state,
        signUpStatus: FetchingStatus.LOADING,
        error: undefined,
      }))
      .addCase(signUp.fulfilled, (state) => ({
        ...state,
        signUpStatus: FetchingStatus.DONE,
      }))
      .addCase(signUp.rejected, (state, action) => ({
        ...state,
        signUpStatus: FetchingStatus.FAILED,
        error: action.payload?.error,
      }))
      .addCase(signIn.pending, (state) => ({
        ...state,
        signInStatus: FetchingStatus.LOADING,
      }))
      .addCase(signIn.fulfilled, (state, action) => ({
        ...state,
        signInStatus: FetchingStatus.DONE,
        isLoggedIn: true,
        userData: action.payload,
      }))
      .addCase(signIn.rejected, (state, action) => ({
        ...state,
        signInStatus: FetchingStatus.FAILED,
        isLoggedIn: false,
        userData: null,
        error: action.payload?.error,
      }))
      .addCase(signOut, () => ({
        signInStatus: FetchingStatus.INITIAL,
        signUpStatus: FetchingStatus.INITIAL,
        isLoggedIn: false,
        userData: null,
      }))
      .addCase(persistAuth, (state, action) => ({
        ...state,
        isLoggedIn: true,
        signInStatus: FetchingStatus.DONE,
        userData: action.payload,
      }));
  },
);

export default authReducer;
