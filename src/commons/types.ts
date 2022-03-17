import { AxiosError } from 'axios';

export type ErrorResponse = { error: string };
export type AxiosErrorResponse = AxiosError<ErrorResponse>;
