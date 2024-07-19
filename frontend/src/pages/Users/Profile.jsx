import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Profile = ({ id }) => {
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <div className="flex flex-col p-[2rem] sm:p-[5rem] gap-[2rem] sm:-mt-[3rem]">
                <h1 className="text-3xl font-semibold ml-[2rem]">Profile</h1>

                <div className="flex flex-col sm:flex-row justify-between bg-white rounded-xl py-[2rem] px-[2rem] sm:px-[4rem] gap-[1rem]">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center">
                            <label htmlFor="name" className='text-md text-neutral-500'>Userame</label>
                            <lord-icon
                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                trigger="hover"
                                stroke="bold"
                                state="hover-line"
                                colors="primary:#000000,secondary:#109173"
                                style={{ width: "20px", height: "20px" }}>
                            </lord-icon>
                        </div>
                        <span className='text-lg font-semibold'>Ali Asif</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className='text-md text-neutral-500'>Email</label>
                        <span className='text-lg font-semibold'>aliasif1171@gmail.com</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-[2rem] md:gap-[0rem] justify-between bg-white rounded-xl py-[2rem] px-[2rem] sm:px-[4rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <h1 className='text-2xl font-semibold'>Orders</h1>

                        <div className="flex flex-row gap-2">
                            <label htmlFor="name" className='text-md text-neutral-500'>Total Orders: </label>
                            <span className='text-md font-semibold'>15</span>
                        </div>

                        <div className="flex flex-row gap-2">
                            <label htmlFor="name" className='text-md text-neutral-500'>Completed: </label>
                            <span className='text-md font-semibold'>13</span>
                        </div>

                        <div className="flex flex-row gap-2">
                            <label htmlFor="name" className='text-md text-neutral-500'>In Progress: </label>
                            <span className='text-md font-semibold'>2</span>
                        </div>
                    </div>

                    <div className="div flex flex-col items-center gap-1 h-[10rem] overflow-y-scroll bg-black p-[1rem]">
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>

                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                        
                        <div className="flex flex-row gap-3 sm:text-base text-xs">
                            <span className='text-neutral-300'>#668e75fb3a73fb39d63644d2</span>

                            <Link to='/admin/orders/668e75fb3a73fb39d63644d2'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jnzhohhs.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                    style={{ width: "25px", height: "25px" }}>
                                </lord-icon>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

        // <div className='absolute left-[20%] top-[20%] shadow-xl h-[65%] w-[60%] px-4 py-2 bg-white rounded-2xl'>
        //     <h1 className='text-center text-3xl font-semibold mt-3'>Profile</h1>

        //     <div className="flex flex-col">
        //         <span>{userInfo.username}</span>
        //         <span>{userInfo.email}</span>
        //         <br />
        //         <span>Total Orders</span>
        //         <span>Orders received</span>
        //         <span>In progress</span>
        //     </div>
        // </div>
    )
}

export default Profile