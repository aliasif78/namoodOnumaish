export const updateCartPricing = (state) => {
    state.itemsPrice = state.cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity * ((100 - item.discountPercent) / 100)) 
    }, 0)
    state.totalPrice = state.itemsPrice + state.shippingPrice
    localStorage.setItem('cart', JSON.stringify(state))
    
    return state
}