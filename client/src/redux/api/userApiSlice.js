import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    registerInit: builder.mutation({
      query: (data) => ({
        url: '/auth/register/init',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/register/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    registerComplete: builder.mutation({
      query: (data) => ({
        url: '/auth/register/complete',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/register/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),

    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: userData
      }),
      invalidatesTags: ['User']
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/auth/password',
        method: 'PUT',
        body: passwordData
      })
    }),
    updateAddresses: builder.mutation({
      query: (addressesData) => ({
        url: '/auth/addresses',
        method: 'PUT',
        body: addressesData
      }),
      invalidatesTags: ['User']
    }),

    getCart: builder.query({
      query: () => '/user/cart',
      providesTags: ['Cart']
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: '/user/cart',
        method: 'POST',
        body: item
      }),
      invalidatesTags: ['Cart']
    }),
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/user/cart/${id}`,
        method: 'PUT',
        body: { quantity }
      }),
      invalidatesTags: ['Cart']
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/user/cart/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/user/cart',
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    }),

    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist']
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Wishlist']
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Wishlist']
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/auth/delete-account',
        method: 'DELETE'
      }),
      invalidatesTags: ['User', 'Cart', 'Wishlist']
    })
  }),
});

export const { 
  useLoginMutation, 
  useRegisterInitMutation,
  useVerifyOtpMutation,
  useRegisterCompleteMutation,
  useResendOtpMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateAddressesMutation,
  useDeleteAccountMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} = userApiSlice;
