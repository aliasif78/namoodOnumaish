import { useState } from "react"
import { toast } from "react-toastify"
import { usePlaceOrderMutation } from "../../redux/api/orderApiSlice"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../../redux/features/cart/cartSlice"

const Checkout = () => {
    const dispatch = useDispatch()
    const [placeOrder] = usePlaceOrderMutation()
    const cart = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (cart.cartItems.length === 0) {
            toast.error("Your cart is empty.")
            return
        }

        if (!name){
            toast.error("Please provide a name.")
            return
        }

        if (!email){
            toast.error("Please provide a email.")
            return
        }

        if (!phoneNumber){
            toast.error("Please provide a phone number.")
            return
        }

        if (!city){
            toast.error("Please provide a city.")
            return
        }

        if (!postalCode){
            toast.error("Please provide a postal code.")
            return
        }

        if (!deliveryAddress){
            toast.error("Please provide a delivery address.")
            return
        }

        if (!paymentMethod){
            toast.error("Please provide a payment method.")
            return
        }

        try {
            const orderItems = cart.cartItems.map(p => ({
                productId: p._id,
                productName: p.name,
                productImage: p.image,
                productQuantity: p.quantity,
                productPrice: p.price
            }))

            placeOrder({
                user: userInfo._id,
                orderItems,
                shippingDetails: { name, email, phoneNumber, city, postalCode, deliveryAddress, paymentMethod },
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            })

            dispatch(clearCart())
            toast.success("Your order has been placed successfully.")
        }

        catch (err) {
            console.error(err)
            toast.error("Error placing order.")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} action="submit" className="mt-[3rem] w-full h-full flex flex-col justify-center align-middle items-center gap-4">
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Name" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder="Phone Number" />
                <input onChange={e => setCity(e.target.value)} value={city} type="text" placeholder="City" />
                <input onChange={e => setPostalCode(e.target.value)} value={postalCode} type="text" placeholder="Postal Code" />
                <input onChange={e => setDeliveryAddress(e.target.value)} value={deliveryAddress} type="text" placeholder="Delivery Address" />

                <select name="paymentMethod" id="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <option value="">Select</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <button type="submit" className="bg-black text-white px-2 py-1 rounded-xl">Place Order</button>
            </form>
        </>
    )
}

export default Checkout