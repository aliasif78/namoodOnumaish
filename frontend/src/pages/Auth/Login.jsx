import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { Link, redirectDocument, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const search = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const [login, { isLoading }] = useLoginMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!email || !password)
            toast.error('Please provide complete information')

        else {
            try {
                const res = await login({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success('Logged in.')
            }

            catch (error) {
                toast.error(error?.data?.message || error.message)
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className='flex flex-col items-center align-middle w-full h-full mt-[2rem]'>
                <h1 className='text-4xl font-semibold'>Login</h1>

                <form className='flex flex-col gap-4 mt-[2rem] w-full items-center' onSubmit={submitHandler}>
                    <input type="email" id='email' placeholder='Email' className='rounded-xl w-[70%] sm:w-[25rem] h-[3rem] border-[1.5px] border-neutral-400 pl-4' value={email} onChange={e => setEmail(e.target.value)} />

                    <input type="password" id='password' placeholder='Password' className='rounded-xl w-[70%] sm:w-[25rem] h-[3rem] border-[1.5px] border-neutral-400 pl-4' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='bg-[#758e6c] hover:bg-[#60705b] transition duration-200 text-white w-[70%] sm:w-[25rem] px-4 py-2 rounded-lg cursor-pointer mt-3'>Enter</button>
                </form>

                <div className='flex flex-row gap-2 mt-2'>
                    <span>Don't have an account?</span>

                    <Link to='/register' className='text-cyan-700 hover:underline'>Register</Link>
                </div>
            </div>
        </>
    )
}

export default Login