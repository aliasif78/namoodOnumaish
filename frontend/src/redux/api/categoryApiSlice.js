import { apiSlice } from './apiSlice.js'
import { CATEGORIES_URL } from '../constants.js'

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORIES_URL}`,
                method: 'POST',
                body: data
            })
        }),

        getCategories: builder.query({
            query: () => ({
                url: `${CATEGORIES_URL}`
            })
        }),

        updateCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORIES_URL}/${data._id}`,
                method: 'PUT',
                body: data
            })
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORIES_URL}/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useAddCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApiSlice