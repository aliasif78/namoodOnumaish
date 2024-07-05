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
            <div className='absolute left-10 top-20 text-3xl font-semibold'>Home</div>
        </>
    )
}

export default Home