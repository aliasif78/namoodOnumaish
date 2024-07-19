import { useState } from "react"
import { useParams } from "react-router"
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "../../redux/api/orderApiSlice"
import { toast } from 'react-toastify'
import { RxDotsVertical } from "react-icons/rx";
import { Link } from 'react-router-dom'

const OrderDetails = () => {
    const { id } = useParams()
    const { data: order, isLoading, isError } = useGetOrderByIdQuery(id)
    const [updateOrder] = useUpdateOrderMutation()

    if (isLoading)
        return <div>Loading order...</div>

    if (isError)
        return <div>Error loading order.</div>

    const handleUpdateOrder = (input) => {
        try {
            if (input === 'shipped') {
                updateOrder({ isShipped: true, isPaid: order.isPaid, isDelivered: order.isDelivered, id })
                toast.success('Order successfully marked as shipped.')
            }

            if (input === 'notShipped') {
                updateOrder({ isShipped: false, isPaid: order.isPaid, isDelivered: order.isDelivered, id })
                toast.success('Order successfully marked as not shipped.')
            }

            if (input === 'paid') {
                updateOrder({ isShipped: order.isShipped, isPaid: true, isDelivered: order.isDelivered, id })
                toast.success('Order successfully marked as paid.')
            }

            if (input === 'notPaid') {
                updateOrder({ isShipped: order.isShipped, isPaid: false, isDelivered: order.isDelivered, id })
                toast.success('Order successfully marked as not paid.')
            }

            if (input === 'delivered') {
                updateOrder({ isShipped: order.isShipped, isPaid: order.isPaid, isDelivered: true, id })
                toast.success('Order successfully marked as delivered.')
            }

            if (input === 'notDelivered') {
                updateOrder({ isShipped: order.isShipped, isPaid: order.isPaid, isDelivered: false, id })
                toast.success('Order successfully marked as not delivered.')
            }
        }

        catch (err) {
            console.error(err)
            toast.error("Error updating order.")
        }
    }

    return (
        <>
            <main className="flex md:flex-row flex-col w-full -mt-[1rem]">
                <section className="flex flex-col gap-[3rem] w-full lg:w-[60%] p-[3rem] lg:text-base text-sm">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-3xl font-semibold">Order</h1>
                        <span className="text-neutral-500">Confirmed September 10</span>
                    </div>

                    <div className="flex flex-col justify-start gap-[2rem] bg-white rounded-lg p-[2rem]">
                        <div className="flex lg:flex-row flex-col items-start lg:items-end justify-between">
                            <div className="flex flex-col justify-start gap-1 w-full">
                                <h1 className="text-2xl font-semibold">Expected September 17</h1>
                                <span className="text-neutral-500">Islamabad</span>
                            </div>

                            <span className="text-neutral-500 lg:text-base text-sm">#{order._id}</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3 items-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/oqdmuxru.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000,secondary:#6B7C65"
                                        style={{ width: "35px", height: "30px" }}>
                                    </lord-icon>

                                    <h1 className="text-lg font-bold">Delivered</h1>
                                </div>

                                <div className="flex flex-row gap-3 items-center ml-2">
                                    <RxDotsVertical className="h-[20px] w-[20px]" />
                                    <h1 className="text-sm">September 17</h1>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3 items-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/zzjjvkam.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000,secondary:#6B7C65"
                                        style={{ width: "35px", height: "30px" }}>
                                    </lord-icon>

                                    <h1 className="text-lg font-bold">Shipped</h1>
                                </div>

                                <div className="flex flex-row gap-3 items-center ml-2">
                                    <RxDotsVertical className="h-[20px] w-[20px]" />
                                    <h1 className="text-sm">September 14</h1>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3 items-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wyqtxzeh.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000,secondary:#6B7C65"
                                        style={{ width: "35px", height: "30px" }}>
                                    </lord-icon>

                                    <h1 className="text-lg font-bold">Paid</h1>
                                </div>

                                <div className="flex flex-row gap-3 items-center ml-2">
                                    <RxDotsVertical className="h-[20px] w-[20px]" />
                                    <h1 className="text-sm">September 11</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-[2rem] bg-white rounded-lg p-[2rem]">
                        <h1 className="text-xl lg:text-2xl font-semibold">Shipping Details</h1>

                        <div className="flex sm:flex-row flex-col w-full gap-[1rem] items-start sm:justify-between">
                            <div className="flex flex-col justify-between gap-[1rem]">
                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">Name</label>
                                    <p className="text-sm md:text-md lg:text-lg">Ali Asif</p>
                                </div>

                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">Email Address</label>
                                    <p className="text-sm md:text-md lg:text-lg">aliasif1171@gmail.com</p>
                                </div>

                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">Payment Method</label>
                                    <p className="text-sm md:text-md lg:text-lg">Bank Transfer</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between gap-[1rem]">
                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">City</label>
                                    <p className="text-sm md:text-md lg:text-lg">Islamabad</p>
                                </div>

                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">Postal Code</label>
                                    <p className="text-sm md:text-md lg:text-lg">44000</p>
                                </div>

                                <div className="flex flex-col justify-start text-start items-start">
                                    <label htmlFor="name" className="text-neutral-500 text-xs md:text-sm lg:text-md">Delivery Address</label>
                                    <p className="text-sm md:text-md lg:text-lg">G-13/1, Street 79, House 16</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col bg-[#ffffff] h-screen w-full lg:w-[40%] gap-[3rem] py-[3rem] px-[1rem] lg:p-[3rem] lg:text-base text-sm">
                    <div className="flex lg:flex-row flex-col items-start lg:items-end justify-between gap-3">
                        <div className="flex flex-row justify-start gap-3">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/modern-cloud-couch-with-soft-boucle-upholstered-7-seaters-comfy-couch-for-living-room-home-office-648907.jpg?v=1714469587&width=1800" alt="" className="h-16 w-16" />

                            <div className="flex flex-col justify-center">
                                <h1 className="font-normal">Vintage Table</h1>
                                <p className="font-light">x1</p>
                            </div>
                        </div>

                        <span className="font-normal">Rs. 15,000</span>
                    </div>

                    <span className="h-[1px] -mt-[1rem] w-full bg-neutral-400"></span>

                    <Link to='/shop' className="text-sm lg:text-base flex flex-row justify-center bg-black text-white border-[2px] border-black hover:bg-white hover:text-black font-semibold px-4 py-2 -mt-[2rem] transition duration-200">Shop More</Link>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                            <span className="font-normal text-xs lg:text-sm">Subtotal</span>
                            <span className="font-normal text-xs lg:text-sm">Rs. 15,000</span>
                        </div>

                        <div className="flex flex-row justify-between">
                            <span className="font-normal text-xs lg:text-sm">Shipping</span>
                            <span className="font-normal text-xs lg:text-sm">Rs. 150</span>
                        </div>

                        <div className="flex flex-row justify-between">
                            <span className="text-md lg:text-xl font-semibold">Total</span>
                            <span className="text-md lg:text-xl font-semibold">Rs. 15,150</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* <div className="flex flex-col w-full justify-between items-center align-middle gap-1">
                <div>{order._id}</div>
                <div>{order.user}</div>
                <div>{order.shippingDetails.name}</div>
                <div>{order.shippingDetails.email}</div>
                <div>{order.shippingDetails.phoneNumber}</div>
                <div>{order.shippingDetails.city}</div>
                <div>{order.shippingDetails.postalCode}</div>
                <div>{order.shippingDetails.deliveryAddress}</div>
                <div>{order.shippingDetails.paymentMethod}</div>

                {!order.isShipped && <button onClick={() => handleUpdateOrder("shipped")} className="bg-red-600 px-2 py-1">Not Shipped</button>}
                {order.isShipped && <button onClick={() => handleUpdateOrder("notShipped")} className="bg-green-600 px-2 py-1">Shipped</button>}

                {!order.isPaid && <button onClick={() => handleUpdateOrder("paid")} className="bg-red-600 px-2 py-1">Not Paid</button>}
                {order.isPaid && <button onClick={() => handleUpdateOrder("notPaid")} className="bg-green-600 px-2 py-1">Paid</button>}

                {!order.isDelivered && <button onClick={() => handleUpdateOrder("delivered")} className="bg-red-600 px-2 py-1">Not Delivered</button>}
                {order.isDelivered && <button onClick={() => handleUpdateOrder("notDelivered")} className="bg-green-600 px-2 py-1">Delivered</button>}

                <div className="mt-[2rem]">
                    {order.orderItems.map(p => (
                        <div key={p.productId} className="flex flex-row gap-3">
                            <div>{p.productId}</div>
                            <div>{p.productName}</div>
                            <div>{p.productQuantity}</div>
                            <div>Rs.{p.productPrice}</div>
                            <img src={p.productImage} alt="productImg.png" />
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    )
}

export default OrderDetails