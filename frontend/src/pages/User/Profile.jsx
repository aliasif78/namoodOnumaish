import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const Profile = ({ id }) => {
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='absolute left-[20%] top-[20%] shadow-xl h-[65%] w-[60%] px-4 py-2 bg-white rounded-2xl'>
            <h1 className='text-center text-3xl font-semibold mt-3'>Profile</h1>

            <div className="flex flex-col">
                <span>{userInfo.username}</span>
                <span>{userInfo.email}</span>
                <br />
                <span>Total Orders</span>
                <span>Orders received</span>
                <span>In progress</span>
            </div>
        </div>
    )
}

export default Profile