import { createSlice } from "@reduxjs/toolkit";
import { updateCartPricing } from "../../utils/updateCartPricing";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: [], itemsPrice: 0, shippingPrice: 0, totalPrice: 0 }

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action) => {
            // Excluding user, rating, numReviews, reviews from the item
            const { description, category, inStock, numReviews, rating, reviews, unitsSold, ...item } = action.payload

            // Check if the item is already in the cart
            const alreadyInCart = state.cartItems.find(i => i._id === item._id)

            if (alreadyInCart)
                return alreadyInCart

            // Add the item to the cart
            state.cartItems = [...state.cartItems, item]
            return updateCartPricing(state)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload._id)
            return updateCartPricing(state)
        },

        changeItemQuantity: (state, action) => {
            for (let i = 0; i < state.cartItems.length; i++)
                if (state.cartItems[i]._id === action.payload._id) {
                    state.cartItems[i].quantity = action.payload.quantity
                    break
                }

            return updateCartPricing(state)
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload

            if (state.shippingAddress.city = 'Islamabad')
                state.shippingPrice = 250
            else
                state.shippingPrice = 350

            localStorage.setItem('cart', JSON.stringify(state))
        },

        clearCart: (state, action) => {
            // Clear all cartItems and pricing but keep the shipping address
            state.cartItems = []
            state.itemsPrice = 0
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
})

export const { addToCart, clearCart, removeFromCart, changeItemQuantity, saveShippingAddress } = cartSlice.actions
export const cartReducer = cartSlice.reducer
export default cartSlice.reducer;