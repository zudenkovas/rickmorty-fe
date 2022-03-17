import { SignInCredentials, SignInResponse, SignUpCredentials, SignUpResponse } from './types';
import { post } from '../../commons/methods';

export const logIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const { data } = await post<SignInCredentials, SignInResponse>('auth/login', credentials);
  return data;
};

export const signUp = async (credentials: SignUpCredentials): Promise<SignUpResponse> => {
  const { data } = await post<SignUpCredentials, SignUpResponse>('auth/signup', credentials);
  return data;
};
