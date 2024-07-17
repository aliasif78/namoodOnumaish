import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLogoutMutation } from '../redux/api/userApiSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {

    const { userInfo } = useSelector(state => state.auth)
    const [logoutApiCall] = useLogoutMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async (e) => {

        try {
            await logoutApiCall()
            dispatch(logout())
            navigate("./login")
        }

        catch (error) {
            toast.error(error)
            console.error(error)
        }
    }

    return (
        <>
            <div className="h-screen -mt-3">
                <div className="h-[70%] bg-[#6B7C65]">
                    <div className="flex flex-col gap-5 text-white h-full justify-end pl-[5rem] pb-[3rem]">
                        <h1 className='text-5xl font-bold w-[30%]'>Furniture That Everyone Loves</h1>

                        <p className='w-[30%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo quis ullam aspernatur, commodi rem expedita, incidunt nulla quia, earum est.</p>

                        <div className="flex flex-row gap-3 font-semibold">
                            <button className='bg-[#31372e] hover:bg-black rounded-full text-sm px-5 py-2 transition duration-200'>Shop now</button>
                            <button className='bg-[#5f6e59] border-[2px] hover:bg-black rounded-full text-sm px-5 py-2 transition duration-200'>Explore</button>
                        </div>
                    </div>

                    <div className="flex flex-row justify-end mr-[5rem]">
                        <img src="https://media-public.canva.com/_AvzM/MAEuIl_AvzM/1/tl.png" alt="img" className='w-[30rem] h-[15rem] -mt-[10rem]' />
                        <img src="https://media-public.canva.com/jXZgE/MAEuIgjXZgE/1/tl.png" alt="img" className='-mt-[17rem] h-[22rem]' />
                    </div>
                </div>
            </div>

            <div className="w-full h-fit flex-col justify-center items-center text-center pt-[3rem] bg-neutral-300">
                <h1 className="w-full h-fit flex justify-center text-5xl">Featured Products</h1>

                <div className="flex flex-row justify-center px-[5rem] py-[3rem] gap-[3rem]">
                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/autumn-spice-465269.jpg?v=1717152558&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Autumn Spice</div>
                        <div className='text-sm'>Rs. 1,800</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/royal-oud-166428.jpg?v=1717153202&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Royal Oud</div>
                        <div className='text-sm'>Rs. 1,750</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/self-love-622771.jpg?v=1717153396&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Self Love</div>
                        <div className='text-sm'>Rs. 2,199</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/vanilla-affair-182721.jpg?v=1717154931&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Vanilla Affair</div>
                        <div className='text-sm'>Rs. 1,500</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full h-fit bg-neutral-900 text-white p-[4rem] my-[7rem]">
                <div className='flex flex-col gap-[2rem] w-[60%] justify-center'>
                    <h1 className='text-5xl'>Wall-to-Wall Carpets</h1>
                    <p className='w-[75%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique omnis numquam dolorum quam deleniti placeat quidem culpa, quo deserunt cumque sint, iusto qui ipsa architecto minima, impedit ipsam in delectus.</p>
                    <button className='bg-black text-white opacity-90 w-fit px-4 py-2 font-semibold border-[2px] hover:bg-white hover:text-black transition duration-200'>Buy Now</button>
                </div>

                <img src="https://www.vsurfaces.com/cdn/shop/files/Bedroom-Wall-To-Wall-Carpets.jpg?v=1684305323&width=900" alt="img" className='h-[30rem] w-[40rem]' />
            </div>

            <div className="w-full h-fit flex-col justify-center items-center text-center pt-[3rem] bg-neutral-300">
                <h1 className="w-full h-fit flex justify-center text-5xl">Explore Categories</h1>

                <div className="flex flex-row justify-center px-[5rem] py-[3rem] gap-[3rem]">
                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/turkish-plush-and-soft-heaven-shaggy-rug-maroon-65-x-93-ft-fluffy-furry-floor-decor-rug-heaven-shaggy-406682.jpg?v=1717154806&width=540" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Arts & Craft</div>
                        <div className='text-sm'>13 items</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/turkish-modern-festival-wd-rug-22-x-76-ft-blue-superior-comfort-modern-runners-style-accent-rugs-353364.jpg?v=1717154291&width=540" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Kids</div>
                        <div className='text-sm'>25 items</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/turkish-modern-festival-1-rug-52-x-72-ft-cream-superior-comfort-modern-style-accent-rugs-584246.jpg?v=1720147621&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Gifts</div>
                        <div className='text-sm'>7 items</div>
                    </div>

                    <div className="card flex flex-col w-fit h-fit">
                        <img src="https://www.vsurfaces.com/cdn/shop/files/preview_images/2d58d9211e274a1591179ae6781de1d3.thumbnail.0000000000.jpg?v=1713537159&width=720" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                        <div className='mt-3'>Decor</div>
                        <div className='text-sm'>17 items</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home