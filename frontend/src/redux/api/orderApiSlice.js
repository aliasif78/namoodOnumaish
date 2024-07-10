import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/placeorder`,
                method: 'POST',
                body: data
            })
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: 'GET'
            })
        }),

        getOrderById: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: 'GET'
            }),

            providesTags: (result, error, id) => [{ type: 'Order', id }]
        }),

        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: 'DELETE'
            })
        }),

        updateOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
    })
})

export const { usePlaceOrderMutation, useDeleteOrderMutation, useGetAllOrdersQuery, useGetOrderByIdQuery, useUpdateOrderMutation } = orderApiSlice