import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {

        let queryString = '/products';
        if (params) {
          const searchParams = new URLSearchParams(params).toString();
          if (searchParams) {
             queryString += `?${searchParams}`;
          }
        }
        return {
          url: queryString,
          method: 'GET'
        };
      },

      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Product', id: _id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    getCategoryStats: builder.query({
      query: () => '/products/categories/stats',
      providesTags: ['Product']
    }),

    getProductReviews: builder.query({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: (result, error, productId) => [{ type: 'Review', id: productId }]
    }),

    createReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body: { rating, comment }
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Review', id: productId }, { type: 'Product', id: productId }]
    }),

    deleteReview: builder.mutation({
      query: ({ reviewId, productId }) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Review', id: productId }]
    })
  }),
  overrideExisting: false,
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery,
  useGetCategoryStatsQuery,
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation
} = productApiSlice;
