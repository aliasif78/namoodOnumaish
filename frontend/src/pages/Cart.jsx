import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeItemQuantity, removeFromCart, clearCart } from "../redux/features/cart/cartSlice"
import { useGetProductDetailsQuery } from "../redux/api/productApiSlice"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage"

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [plantPNG, setPlantPNG] = useState('')

    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                // Get Firebase download URL for the image
                const storage = getStorage();
                const storageRef = ref(storage, "images/plant.png");
                const downloadURL = await getDownloadURL(storageRef);
                setPlantPNG(downloadURL);
            }

            catch (err) {
                console.error('Error fetching image: ', err);
            }
        };

        fetchImageURL();
    }, [])

    if (!cart)
        return <div>Loading cart...</div>

    // if (cart.cartItems.length == 0)
    //     return <div>Your cart is empty.</div>

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

    // const emptyCart = () => {
    //     if (window.confirm("Are you sure that you want to clear your cart?")) {
    //         try {
    //             dispatch(clearCart())
    //         }

    //         catch (err) {
    //             console.error(err)
    //             toast.error("Failed to clear cart.")
    //         }
    //     }
    // }

    return (
        <>
            <div className="h-screen bg-white">
                <div className="flex flex-col justify-center items-center text-center w-full h-fit gap-[1rem] bg-[#f3f3f3] py-[2rem] -mt-[1rem]">
                    <h1 className="text-4xl font-semibold">Cart</h1>
                    <p className="text-sm w-[80%] md:w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum, omnis soluta aut temporibus repellendus reiciendis. Sed culpa dignissimos alias!</p>

                    <div className="flex flex-row gap-3 mt-[1rem]">
                        <Link to='/' className="text-[#576353] underline">Home</Link>
                        <span>/</span>
                        <Link to='/shop' className="text-[#576353] underline">Shop</Link>
                    </div>
                </div>

                <div className="px-[1rem] sm:px-[3rem] mt-[3rem]">
                    <table className="border-[1px] border-[#dee2e6] bg-white text-black w-full shadow-xl">
                        <tr className="flex flex-row justify-between px-[1rem] sm:px-[2rem] py-[0.5rem] border-b-2 border-[#dee2e6]">
                            <th className="font-medium w-[15%] sm:w-[10%]"></th>
                            <th className="font-medium w-[35%] sm:w-[20%]">Product</th>
                            <th className="font-medium hidden sm:flex flex-col justify-center sm:w-[20%]">Price</th>
                            <th className="font-medium w-[20%] sm:w-[20%]">Quantity</th>
                            <th className="font-medium w-[25%]">Total</th>
                            <th className="font-medium w-[10%]"></th>
                        </tr>

                        <tr className="font-medium flex flex-row px-1 sm:px-[2rem] py-[1rem] border-b-[1px] border-neutral-300">
                            <td className="w-[15%] sm:w-[10%]"><img src="https://cdn.shopify.com/s/files/1/0585/9786/7676/files/modern-cloud-couch-with-soft-boucle-upholstered-3-seaters-comfy-couch-for-living-room-home-office-912289_128x128.jpg?v=1717153174" alt="img" className="size-[4rem]" /></td>

                            <td className="flex flex-row justify-center pb-4 items-center text-sm w-[35%] sm:w-[20%]">
                                <div className="flex flex-col items-start gap-1">
                                    <span>Trendy Cloth</span>
                                    <span className="text-xs sm:hidden text-neutral-500">$ 90.00</span>
                                </div>
                            </td>
                            <td className="hidden sm:flex flex-row justify-center pb-4 items-center w-[15%] sm:w-[20%] font-normal text-neutral-500">$ 90.00</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[20%] sm:w-[20%] font-normal text-neutral-500">2</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[25%] font-normal text-neutral-500">$ 180.00</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[10%] text-red-600 font-bold">
                                <lord-icon
                                    class="cursor-pointer"
                                    // onClick={() => handleDelete(p)}
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#c71f16"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </td>
                        </tr>

                        <tr className="font-medium flex flex-row px-1 sm:px-[2rem] py-[1rem] border-b-[1px] border-neutral-300">
                            <td className="w-[15%] sm:w-[10%]"><img src="data:image/jpeg;base64,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" alt="img" className="size-[4rem]" /></td>

                            <td className="flex flex-row justify-center pb-4 items-center text-sm w-[35%] sm:w-[20%]">
                                <div className="flex flex-col items-start gap-1">
                                    <span>Sunglasses</span>
                                    <span className="text-xs sm:hidden text-neutral-500">$ 45.00</span>
                                </div>
                            </td>
                            <td className="hidden sm:flex flex-row justify-center pb-4 items-center w-[15%] sm:w-[20%] font-normal text-neutral-500">$ 45.00</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[20%] sm:w-[20%] font-normal text-neutral-500">1</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[25%] font-normal text-neutral-500">$ 45.00</td>
                            <td className="flex flex-row justify-center pb-4 items-center w-[10%] text-red-600 font-bold">
                                <lord-icon
                                    class="cursor-pointer"
                                    // onClick={() => handleDelete(p)}
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#c71f16"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </td>
                        </tr>

                        <tr className="flex flex-col sm:flex-row items-end gap-[1rem] sm:gap-0 sm:justify-between sm:items-center px-[2rem] py-[1rem] border-b-[1px] border-neutral-300">
                            <div className="flex flex-row gap-2">
                                <span className="font-semibold">Grand Total: </span>
                                <span className="text-nuetral-500">$ 225.00</span>
                            </div>

                            <Link to='/checkout' className="bg-black text-white hover:bg-white hover:text-black border-[2px] border-black px-4 py-1 transition duration-200">Proceed to Checkout</Link>
                        </tr>
                    </table>
                </div>
            </div>

            {/* <div className="flex flex-col justify-between items-center gap-3 mt-[3rem]">
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
            </div> */}
        </>
    )
}

export default Cart