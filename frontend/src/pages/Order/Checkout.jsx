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
    const [city, setCity] = useState('x')
    const [postalCode, setPostalCode] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('x')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (cart.cartItems.length === 0) {
            toast.error("Your cart is empty.")
            return
        }

        if (!name) {
            toast.error("Please provide a name.")
            return
        }

        if (!email) {
            toast.error("Please provide a email.")
            return
        }

        if (!phoneNumber) {
            toast.error("Please provide a phone number.")
            return
        }

        if (!city) {
            toast.error("Please provide a city.")
            return
        }

        if (!postalCode) {
            toast.error("Please provide a postal code.")
            return
        }

        if (!deliveryAddress) {
            toast.error("Please provide a delivery address.")
            return
        }

        if (!paymentMethod) {
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
            <main className="flex flex-row w-full -mt-[1rem]">
                <section className="flex flex-col gap-[3rem] w-[60%] bg-white h-screen p-[3rem]">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold">Contact</h1>
                        <input type="email" placeholder="Email Address" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 text-sm" />

                        <div className="flex flex-row gap-2 items-center">
                            <input type="checkbox" className="h-4 w-4 p-2 checked:bg-black border-gray-300 rounded-sm" />
                            <span>Email me with news and offers</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold">Shipping</h1>

                        <form action="submit" className="flex flex-col gap-[1rem] w-full text-sm">
                            <div className="flex flex-row w-full justify-between gap-3">
                                <input type="name" placeholder="Name" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 w-1/2" />
                                <input type="phone" placeholder="Phone Number" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 w-1/2" />
                            </div>

                            <select name="paymentMethod" id="paymentMethod" value={paymentMethod} className={`px-4 py-3 border-[1px] border-neutral-300 ${paymentMethod === "x" ? "text-neutral-500" : "text-black"}`} onChange={e => setPaymentMethod(e.target.value)}>
                                <option value="x" disabled selected>Payment Method</option>
                                <option value="EP">EasyPaisa</option>
                                <option value="BT">Bank Transfer</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>

                            <div className="flex flex-row w-full justify-between gap-3">
                                <select name="city" id="City" value={city} className={`px-4 py-3 border-[1px] border-neutral-300 ${city === "x" ? "text-neutral-500" : "text-black"} w-1/2`} onChange={e => setCity(e.target.value)}>
                                    <option value="x" disabled selected>City</option>
                                    <option value="Islamabad">Islamabad</option>
                                    <option value="Other">Other</option>
                                </select>

                                <input type="number" placeholder="Postal Code" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 w-1/2" />
                            </div>

                            {city === "Other" && <input type="city" placeholder="City" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 w-full" />}

                            <input type="address" placeholder="Address" className="px-4 py-3 border-[1px] border-neutral-300 rounded-md placeholder:text-neutral-500 w-full" />
                        </form>
                    </div>
                </section>

                <section className="flex flex-col bg-[#eaeaea] h-screen w-[40%] gap-[3rem] p-[3rem]">
                    <div className="flex flex-row items-end justify-between gap-3">
                        <div className="flex flex-row justify-start gap-3">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/modern-cloud-couch-with-soft-boucle-upholstered-7-seaters-comfy-couch-for-living-room-home-office-648907.jpg?v=1714469587&width=1800" alt="" className="h-16 w-16" />

                            <div className="flex flex-col justify-center">
                                <h1 className="font-normal">Vintage Table</h1>
                                <p className="font-light">x1</p>
                            </div>
                        </div>

                        <span className="font-normal">Rs. 15,000</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                            <span className="font-normal text-sm">Subtotal</span>
                            <span className="font-normal text-sm">Rs. 15,000</span>
                        </div>

                        <div className="flex flex-row justify-between">
                            <span className="font-normal text-sm">Shipping</span>
                            <span className="font-normal text-sm">Rs. 150</span>
                        </div>
                        
                        <div className="flex flex-row justify-between">
                            <span className="text-xl font-semibold">Total</span>
                            <span className="text-xl font-semibold">Rs. 15,150</span>
                        </div>
                    </div>
                </section>
            </main>
            {/* <form onSubmit={handleSubmit} action="submit" className="mt-[3rem] w-full h-full flex flex-col justify-center align-middle items-center gap-4">
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Name" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder="Phone Number" />
                <input onChange={e => setCity(e.target.value)} value={city} type="text" placeholder="City" />
                <input onChange={e => setPostalCode(e.target.value)} value={postalCode} type="text" placeholder="Postal Code" />
                <input onChange={e => setDeliveryAddress(e.target.value)} value={deliveryAddress} type="text" placeholder="Delivery Address" />

                <select name="paymentMethod" id="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <option value="">Select</option>
                    <option value="EP">EasyPaisa</option>
                    <option value="BT">Bank Transfer</option>
                    <option value="COD">Cash on Delivery</option>
                </select>

                <button type="submit" className="bg-black text-white px-2 py-1 rounded-xl">Place Order</button>
            </form> */}
        </>
    )
}

export default Checkout