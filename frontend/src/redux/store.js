import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from './api/apiSlice.js'
import { authReducer } from './features/auth/authSlice.js'
import { cartReducer } from "./features/cart/cartSlice.js";
// import { shopSliceReducer } from "./features/shop/shopSlice.js";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cart: cartReducer,
        // shop: shopSliceReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store