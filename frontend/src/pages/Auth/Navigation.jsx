import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineUser, AiOutlineShoppingCart, AiOutlineSetting } from 'react-icons/ai'
import { IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

export const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('./login')
    }

    return (
        <>
            <div className="sticky z-50 w-full h-14 top-0 bg-black text-white flex justify-between items-center align-middle px-[2rem]">
                <span className='cursor-default hover:text-cyan-300'>Logo</span>

                <div className='flex w-full justify-center gap-[4rem]'>
                    <Link to='/'>
                        <span className='cursor-pointer hover:text-cyan-300'>Home</span>
                    </Link>

                    <Link to='/shop'>
                        <span className='cursor-pointer hover:text-cyan-300'>Shop</span>
                    </Link>

                    <Link to='/aboutus'>
                        <span className='cursor-pointer hover:text-cyan-300'>About Us</span>
                    </Link>
                </div>

                <div className='flex w-fit gap-5'>
                    <Link to='/favourites'>
                        <IoIosHeartEmpty className='h-6 w-6 cursor-pointer hover:text-cyan-300' />
                    </Link>

                    <Link to='/cart'>
                        <AiOutlineShoppingCart className='h-6 w-6 cursor-pointer hover:text-cyan-300' />
                    </Link>

                    {userInfo ? (
                        <div className='relative'>
                            <button onClick={() => toggleDropDown()}>
                                <AiOutlineSetting className='h-6 w-6 cursor-pointer hover:text-cyan-300' />
                            </button>

                            {dropDownOpen && (
                                <div className='absolute -right-5 mt-1 w-fit bg-white rounded-md shadow-lg py-2 z-20 items-start'>
                                    <Link to={`/profile/${userInfo._id}`} className='block px-4 py-2 text-black hover:bg-gray-200'>
                                        Profile
                                    </Link>

                                    {userInfo.isAdmin && (
                                        <>
                                            <Link to='/admin/dashboard' className='block px-4 py-2 text-black hover:bg-gray-200'>
                                                Dashboard
                                            </Link>

                                            <Link to='/admin/products' className='block px-4 py-2 text-black hover:bg-gray-200'>
                                                Products
                                            </Link>

                                            <Link to='/admin/categories' className='block px-4 py-2 text-black hover:bg-gray-200'>
                                                Categories
                                            </Link>

                                            <Link to='/admin/orders' className='block px-4 py-2 text-black hover:bg-gray-200'>
                                                Orders
                                            </Link>

                                            <Link to='/admin/users' className='block px-4 py-2 text-black hover:bg-gray-200'>
                                                Users
                                            </Link>
                                        </>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className='block px-4 py-2 text-black hover:bg-gray-200 w-full text-left'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/register'>
                            <button>
                                <AiOutlineUser className='h-6 w-6 cursor-pointer hover:text-cyan-300' />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
} 