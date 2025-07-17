import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from './types';

const baseUrl = 'http://localhost:3000/api/v1/';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (newUser) => ({
        url: 'auth/admin/login',
        method: 'POST',
        applications: 'application/json',
        body: newUser,
      }),
    }),
    refreshToken: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST', 
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation
} = api;
