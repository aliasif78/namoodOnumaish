import { useState, useEffect } from "react"
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice"
import { Link } from 'react-router-dom'
import { useDeleteOrderMutation } from "../../redux/api/orderApiSlice"
import { useUpdateOrderMutation } from "../../redux/api/orderApiSlice"
import { toast } from "react-toastify"
import { getStorage, ref, getDownloadURL } from "firebase/storage"

import { RiSortAlphabetAsc, RiSortAlphabetDesc, RiCoinFill, RiUserReceived2Fill } from "react-icons/ri";
import { FaCoins, FaCheck, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdOutlineWrongLocation, MdLocalShipping } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { AiFillBank } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FaSackDollar } from "react-icons/fa6";

const Orders = () => {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery()
    const [easyPaisa, setEasyPaisa] = useState('')
    const [deleteOrder] = useDeleteOrderMutation()
    const [updateOrder] = useUpdateOrderMutation()

    const [ordersCopy, setOrdersCopy] = useState([])
    const [isSorted, setIsSorted] = useState(false)

    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                // Get Firebase download URL for the image
                const storage = getStorage();
                const storageRef = ref(storage, "images/easypaisa.png");
                const downloadURL = await getDownloadURL(storageRef);
                setEasyPaisa(downloadURL);
            }

            catch (err) {
                console.error('Error fetching image: ', err);
            }
        };

        fetchImageURL();
    }, [])

    if (isLoading)
        return <div>Loading orders...</div>

    if (isError)
        return <div>Error loading orders.</div>

    if (orders.length === 0)
        return <div>No orders are currently active.</div>

    const handleUpdateOrder = (input, order) => {
        try {
            if (input === 'shipped' && window.confirm("Are you sure that you want to mark this order as shipped?")) {
                updateOrder({ isShipped: true, isPaid: order.isPaid, isDelivered: order.isDelivered, id: order._id })
                toast.success('Order successfully marked as shipped.')
            }

            if (input === 'notShipped' && window.confirm("Are you sure that you want to mark this order as not shipped?")) {
                updateOrder({ isShipped: false, isPaid: order.isPaid, isDelivered: order.isDelivered, id: order._id })
                toast.success('Order successfully marked as not shipped.')
            }

            if (input === 'paid' && window.confirm("Are you sure that you want to mark this order as paid?")) {
                updateOrder({ isShipped: order.isShipped, isPaid: true, isDelivered: order.isDelivered, id: order._id })
                toast.success('Order successfully marked as paid.')
            }

            if (input === 'notPaid' && window.confirm("Are you sure that you want to mark this order as not paid?")) {
                updateOrder({ isShipped: order.isShipped, isPaid: false, isDelivered: order.isDelivered, id: order._id })
                toast.success('Order successfully marked as not paid.')
            }

            if (input === 'delivered' && window.confirm("Are you sure that you want to mark this order as delivered?")) {
                updateOrder({ isShipped: order.isShipped, isPaid: order.isPaid, isDelivered: true, id: order._id })
                toast.success('Order successfully marked as delivered.')
            }

            if (input === 'notDelivered' && window.confirm("Are you sure that you want to mark this order as not delivered?")) {
                updateOrder({ isShipped: order.isShipped, isPaid: order.isPaid, isDelivered: false, id: order._id })
                toast.success('Order successfully marked as not delivered.')
            }
        }

        catch (err) {
            console.error(err)
            toast.error("Error updating order.")
        }
    }

    const sortAZ = () => {
        toast.info("Sorted in alphabetical order.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].sort((a, b) => {
            return a.shippingDetails.name.localeCompare(b.shippingDetails.name, 'en', { sensitivity: 'base' });
        });

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    };

    const sortZA = () => {
        toast.info("Sorted in reverse alphabetical order.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].sort((a, b) => {
            return b.shippingDetails.name.localeCompare(a.shippingDetails.name, 'en', { sensitivity: 'base' });
        });

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    };

    const sortPriceLH = () => {
        toast.info("Sorted in ascending order of price.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].sort((a, b) => {
            return a.totalPrice - b.totalPrice
        });

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    };

    const sortPriceHL = () => {
        toast.info("Sorted in descending order of price.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].sort((a, b) => {
            return b.totalPrice - a.totalPrice
        });

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    };

    const sortIslamabad = () => {
        toast.info("Showing orders in Islamabad.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.shippingDetails.city === "Islamabad");

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortNotIslamabad = () => {
        toast.info("Showing orders outside of Islamabad.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.shippingDetails.city !== "Islamabad");

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortCOD = () => {
        toast.info("Showing cash on delivery orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.shippingDetails.paymentMethod === "Cash On Delivery");

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortEP = () => {
        toast.info("Showing Easypaisa orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.shippingDetails.paymentMethod === "Easy Paisa");

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortBT = () => {
        toast.info("Showing bank transfer orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.shippingDetails.paymentMethod === "Bank Transfer");

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortShipped = () => {
        toast.info("Showing shipped orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.isShipped === true);

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortDelivered = () => {
        toast.info("Showing delivered orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.isDelivered === true);

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    const sortPaid = () => {
        toast.info("Showing paid orders.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedOrders = [...orders].filter(o => o.isPaid === true);

        // Update state with the sorted products
        setOrdersCopy(sortedOrders);
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen cursor-default">
                <div className="bg-white flex flex-col w-[90%] h-[75%] -mt-[5rem] shadow-xl px-[2rem]">
                    <div className="flex flex-row h-[20%] items-center justify-between">
                        <span className="font-semibold text-neutral-700 text-2xl ml-[1rem]">Orders</span>

                        <div className="flex flex-row items-end gap-5">
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-2">
                                    <MdLocalShipping onClick={sortShipped} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <FaSackDollar onClick={sortPaid} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <RiUserReceived2Fill onClick={sortDelivered} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                </div>

                                <div className="flex flex-row gap-2">
                                    <FaMoneyBillWave onClick={sortCOD} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <img onClick={sortEP} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer" src={easyPaisa} />
                                    <AiFillBank onClick={sortBT} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                </div>

                                <div className="flex flex-row gap-2">
                                    <RiCoinFill onClick={sortPriceLH} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <FaCoins onClick={sortPriceHL} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                                </div>

                                <div className="flex flex-row gap-2">
                                    <GrLocation onClick={sortIslamabad} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <MdOutlineWrongLocation onClick={sortNotIslamabad} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                </div>

                                <div className="flex flex-row gap-2">
                                    <RiSortAlphabetAsc onClick={sortAZ} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                    <RiSortAlphabetDesc onClick={sortZA} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                </div>
                            </div>

                            <Link to='/admin/dashboard'>
                                <MdOutlineSpaceDashboard className="bg-blue-700 hover:bg-blue-900 text-white text-3xl p-1 cursor-pointer" />
                            </Link>
                        </div>
                    </div>

                    <table className="w-full flex flex-col justify-between border-[2px] gap-3 h-[70%] overflow-y-auto">
                        <thead className="flex flex-row justify-start text-neutral-500 text-sm border-b-2 p-2 bg-[#f0f0f3]">
                            <th className="font-semibold">ID</th>
                            <th className="font-semibold w-[15%]">Name</th>
                            <th className="font-semibold w-[15%]">Email</th>
                            <th className="font-semibold w-[15%]">Phone Number</th>
                            <th className="font-semibold w-[7%]">City</th>
                            <th className="font-semibold w-[15%]">Payment Method</th>
                            <th className="font-semibold w-[5%]">Shipped</th>
                            <th className="font-semibold w-[5%]">Paid</th>
                            <th className="font-semibold w-[5%]">Delivered</th>
                            <th className="font-semibold w-[11%]">Price</th>
                            <th className="font-semibold w-[6%]">Actions</th>
                        </thead>

                        {(!isSorted ? orders : ordersCopy).map((o, index) => (
                            <tr key={o._id} className="flex flex-row px-2 pb-2.5 border-b-[1.5px] justify-center align-middle">
                                <td className="">{index + 1}</td>
                                <td className="w-[15%] flex flex-row justify-center ">{o.shippingDetails.name}</td>
                                <td className="w-[15%] flex flex-row justify-center ">{o.shippingDetails.email}</td>
                                <td className="w-[15%] flex flex-row justify-center px-4">{o.shippingDetails.phoneNumber}</td>
                                <td className="w-[7%] flex flex-row justify-center px-4">{o.shippingDetails.city}</td>
                                <td className="w-[15%] flex flex-row justify-center">
                                    {o.shippingDetails.paymentMethod === "Cash On Delivery" ? <FaMoneyBillWave className="text-emerald-600 size-6 " /> : o.shippingDetails.paymentMethod === "Bank Transfer" ? <AiFillBank className="text-black size-6 " /> : <img src={easyPaisa} alt="." className="size-6"></img>}
                                </td>

                                {!o.isShipped && <button onClick={() => handleUpdateOrder("shipped", o)} className="text-red-600 flex flex-row justify-center items-center w-[5%]"><ImCross /></button>}
                                {o.isShipped && <button onClick={() => handleUpdateOrder("notShipped", o)} className="text-green-600 flex flex-row justify-center items-center w-[5%] text-xl"><FaCheck /></button>}

                                {!o.isPaid && <button onClick={() => handleUpdateOrder("paid", o)} className="text-red-600 flex flex-row justify-center items-center w-[5%]"><ImCross /></button>}
                                {o.isPaid && <button onClick={() => handleUpdateOrder("notPaid", o)} className="text-green-600 flex flex-row justify-center items-center w-[5%] text-xl"><FaCheck /></button>}

                                {!o.isDelivered && <button onClick={() => handleUpdateOrder("delivered", o)} className="text-red-600 flex flex-row justify-center items-center w-[5%]"><ImCross /></button>}
                                {o.isDelivered && <button onClick={() => handleUpdateOrder("notDelivered", o)} className="text-green-600 flex flex-row justify-center items-center w-[5%] text-xl"><FaCheck /></button>}

                                <td className="w-[11%] flex flex-row justify-center px-4">Rs. {o.totalPrice}</td>

                                <td className="w-[6%] flex flex-row gap-2 justify-center">
                                    <Link to={`/admin/orders/${o._id}`}>
                                        <lord-icon
                                            class="cursor-pointer"
                                            onClick={() => handleEdit(p)}
                                            src="https://cdn.lordicon.com/jnzhohhs.json"
                                            trigger="hover"
                                            state="hover-line"
                                            stroke="bold"
                                            colors="primary:#1b1091"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div >
        </>
    )
}

export default Orders