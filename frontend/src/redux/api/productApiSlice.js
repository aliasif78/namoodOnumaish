import { apiSlice } from './apiSlice.js'
import { PRODUCTS_URL } from '../constants.js'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data
            })
        }),

        getProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'GET'
            })
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: 'PUT',
                body: product
            })
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useAddProductMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } = productApiSlice