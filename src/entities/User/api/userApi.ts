import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryConfig } from "../../../shared/api/api";
import { getToken } from '../../Admin/admin.models';

interface CreateAdminRequest {
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
}

const userConfig = {
    ...baseQueryConfig,
    baseUrl: baseQueryConfig.baseUrl+'/user',
    prepareHeaders: (headers: Headers) => {
      const session = getToken();
      headers.set('Authorization', `Bearer ${session.token}`);
      return headers;
    },
}

export const adminApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery(userConfig),
  endpoints: (builder) => ({
    createUser: builder.mutation<any, any>({
      query: (data) => ({
        url: '/add',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateUserMutation } = adminApi

