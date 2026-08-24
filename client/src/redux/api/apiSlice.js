import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateAccessToken, logout } from '@/redux/slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/lumina',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-token',
          method: 'POST',
          body: { refreshToken }
        },
        api,
        extraOptions
      );

      if (refreshResult.data && refreshResult.data.token) {
        api.dispatch(
          updateAccessToken({
            token: refreshResult.data.token,
            refreshToken: refreshResult.data.refreshToken
          })
        );
        // Retry the initial query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'User', 'Order', 'Review', 'Coupon'],
  endpoints: () => ({})
});
