import { apiSlice } from './apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => '/admin/analytics',
      providesTags: ['Order', 'Product']
    }),
    getAdminOrders: builder.query({
      query: () => '/admin/orders',
      providesTags: ['Order']
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/orders/${id}/status`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['Order']
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/admin/products',
        method: 'POST',
        body: productData
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/products/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),
    getCoupons: builder.query({
      query: () => '/admin/coupons',
      providesTags: ['Coupon']
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: '/admin/coupons',
        method: 'POST',
        body: couponData
      }),
      invalidatesTags: ['Coupon']
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/coupons/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Coupon']
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/admin/coupons/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Coupon']
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        body: data
      })
    }),
    getAdminUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User']
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: 'PUT',
        body: { role }
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
  }),
  overrideExisting: false,
});

export const {
  useGetAnalyticsQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useUploadImageMutation,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = adminApiSlice;
