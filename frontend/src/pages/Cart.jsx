import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeItemQuantity, removeFromCart, clearCart } from "../redux/features/cart/cartSlice"
import { useGetProductDetailsQuery } from "../redux/api/productApiSlice"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    if (!cart)
        return <div>Loading cart...</div>

    if (cart.cartItems.length == 0)
        return <div>Your cart is empty.</div>

    const changeQuantity = (product, action) => {
        const updatedProduct = { ...product }

        if (action === '+')
            updatedProduct.quantity += 1
        else {
            if (updatedProduct.quantity > 1)
                updatedProduct.quantity -= 1
            else
                return
        }

        try {
            dispatch(changeItemQuantity(updatedProduct))
        }

        catch (err) {
            toast.error(err)
            console.error(err)
        }
    }

    const removeProduct = (product) => {
        const productToRemove = { ...product }

        try {
            dispatch(removeFromCart(productToRemove))
        }

        catch (err) {
            console.error(err)
            toast.error("Failed to remove product.")
        }
    }

    const emptyCart = () => {
        if (window.confirm("Are you sure that you want to clear your cart?")) {
            try {
                dispatch(clearCart())
            }

            catch (err) {
                console.error(err)
                toast.error("Failed to clear cart.")
            }
        }
    }

    return (
        <>
            <div className="flex flex-col justify-between items-center gap-3 mt-[3rem]">
                {cart.cartItems.map(i => (
                    <div key={i._id} className="flex flex-row justify-between items-center gap-3">
                        <img className="h-10 w-10" src={i.image} alt="itemImage.png" />
                        <div>{i.name}</div>
                        <div>Rs.{i.price}</div>

                        <button onClick={() => changeQuantity(i, '-')} className="bg-black text-white px-2 py-1">-</button>
                        <div>{i.quantity}</div>
                        <button onClick={() => changeQuantity(i, '+')} className="bg-black text-white px-2 py-1">+</button>

                        <button onClick={() => removeProduct(i)} className="bg-red-600 px-2 py-1">Remove</button>
                    </div>
                ))}

                <div className="mt-[3rem] items-center">
                    <div className="flex flex-row gap-2">
                        <button onClick={emptyCart} className="bg-red-600 px-2 py-1">Empty Cart</button>
                        <Link to='/checkout' className="bg-green-600 px-2 py-1">Checkout</Link>
                    </div>

                    <div className="font-semibold text-xl">Rs. {cart.totalPrice}</div>
                </div>
            </div>
        </>
    )
}

export default Cart