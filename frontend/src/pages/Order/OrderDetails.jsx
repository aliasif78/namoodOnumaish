import { useState } from "react"
import { useParams } from "react-router"
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "../../redux/api/orderApiSlice"
import { toast } from 'react-toastify'

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
            <div className="flex flex-col w-full justify-between items-center align-middle gap-1">
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
            </div>
        </>
    )
}

export default OrderDetails