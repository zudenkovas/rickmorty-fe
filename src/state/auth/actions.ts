import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'commons/constants';
import { AxiosErrorResponse } from 'commons/types';

import { signUp as userSignUp, logIn } from './apiActions';
import { SignUpCredentials, SignInCredentials, SignInResponse, SignUpResponse } from './types';
import { RejectValue } from '../types';

export const signUp = createAsyncThunk<SignUpResponse, SignUpCredentials, RejectValue>('auth/signup', async (credentials, { rejectWithValue }) => {
  try {
    const response = await userSignUp(credentials);
    return response;
  } catch (err) {
    const error = err as AxiosErrorResponse;
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response?.data);
  }
});

export const signIn = createAsyncThunk<SignInResponse, SignInCredentials, RejectValue>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await logIn(credentials);
    localStorage.setItem(TOKEN_KEY, response.token);
    return response;
  } catch (err) {
    const error = err as AxiosErrorResponse;
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response?.data);
  }
});

export const signOut = createAction('auth/logout', () => {
  localStorage.removeItem(TOKEN_KEY);
  return { payload: {} };
});

export const persistAuth = createAction('auth/persist', (userData: SignInResponse) => {
  return { payload: userData };
});
