import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData
      }),
      invalidatesTags: ['Order', 'Cart'] 
    }),
    getMyOrders: builder.query({
      query: () => '/orders/mine',
      providesTags: (result) => 
        result?.data ? 
        [...result.data.map(({ _id }) => ({ type: 'Order', id: _id })), { type: 'Order', id: 'LIST' }] : 
        [{ type: 'Order', id: 'LIST' }]
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }]
    }),
    payOrder: builder.mutation({
      query: ({ id, paymentResult }) => ({
        url: `/orders/${id}/pay`,
        method: 'PUT',
        body: paymentResult
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }]
    }),
    validateCoupon: builder.query({
      query: (code) => `/coupons/${code}`,
      providesTags: ['Coupon']
    })
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useLazyValidateCouponQuery
} = orderApiSlice;
