import { apiSlice } from './apiSlice.js'
import { USERS_URL } from '../constants.js'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),

        getUserProfile: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/profile/${id}`,
            }),

            providesTags: ["User"]
        }),

        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile/${data.userId}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ["User"]
        }),

        updateUserProfileById: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ["User"]
        }),

        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),

            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        
        deleteUserProfileById: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useRegisterMutation, useUpdateUserProfileMutation, useUpdateUserProfileByIdMutation, useLoginMutation, useLogoutMutation, useGetUserProfileQuery, useGetUsersQuery, useDeleteUserProfileByIdMutation } = userApiSlice