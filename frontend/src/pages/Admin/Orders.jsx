import { useState } from "react"
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice"
import { Link } from 'react-router-dom'
import { useDeleteOrderMutation } from "../../redux/api/orderApiSlice"
import { toast } from "react-toastify"

const Orders = () => {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery()
    const [deleteOrder] = useDeleteOrderMutation()

    if (isLoading)
        return <div>Loading orders...</div>

    if (isError)
        return <div>Error loading orders.</div>

    if (orders.length === 0)
        return <div>No orders are currently active.</div>

    const handleDelete = (id) => {
        try {
            deleteOrder(id)
            toast.success("Order deleted successfully.")    
        } 
        
        catch (err) {
            console.error(err)
            toast.error("Error deleting order.")
        }
    }

    return (
        <>
            <div className="w-full h-fit flex flex-col justify-center items-center align-middle gap-2">
                {orders.map((o, index) => (
                    <div key={index} className="w-fit h-fit flex flex-row justify-center items-center align-middle gap-2">
                        <Link to={`/admin/orders/${o._id}`} className="text-cyan-700 hover:underline cursor-pointer">{o.shippingDetails.name}</Link>
                        <div>{o.shippingDetails.email}</div>
                        <div>{o.shippingDetails.phoneNumber}</div>
                        <div>{o.shippingDetails.postalCode}</div>
                        <div>{o.shippingDetails.deliveryAddress}</div>
                        <div>{o.shippingDetails.paymentMethod}</div>
                        <div>Rs.{o.totalPrice}</div>

                        <button onClick={()=>handleDelete(o._id)} className="bg-red-600 px-2 py-1 rounded-xl">Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Orders