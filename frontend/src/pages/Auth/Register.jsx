import React from 'react'
import { useState, useEffect } from 'react'
import { Link, redirectDocument, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/userApiSlice'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const search = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!username || !email || !password || !confirmPassword)
            toast.error('Please provide complete information')

        else if (password !== confirmPassword)
            toast.error('Passwords do not match.')

        else {
            try {
                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success('User successfully registered.')
            }

            catch (error) {
                toast.error(error.data?.message || error.message);
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className='flex flex-col items-center align-middle w-full h-full mt-[2rem] mb-[5.75rem]'>
                <h1 className='text-2xl sm:text-4xl font-semibold'>Create Account</h1>

                <form className='flex flex-col gap-4 mt-[2rem] w-full items-center' onSubmit={submitHandler}>
                    <input type="username" id='username' placeholder='Username' className='rounded-xl w-[70%] sm:w-[25rem] h-[3rem] border-[1.5px] border-neutral-400 pl-4' value={username} onChange={e => setUsername(e.target.value)} />

                    <input type="email" id='email' placeholder='Email' className='rounded-xl h-[3rem] w-[70%] sm:w-[25rem] border-[1.5px] border-neutral-400 pl-4' value={email} onChange={e => setEmail(e.target.value)} />

                    <input type="password" id='password' placeholder='Password' className='rounded-xl h-[3rem] w-[70%] sm:w-[25rem] border-[1.5px] border-neutral-400 pl-4' value={password} onChange={e => setPassword(e.target.value)} />

                    <input type="password" id='confirmPassword' placeholder='Confirm Password' className='rounded-xl w-[70%] sm:w-[25rem] h-[3rem] border-[1.5px] border-neutral-400 pl-4' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                    <button disabled={isLoading} type='submit' className='bg-[#758e6c] hover:bg-[#60705b] transition duration-200 text-white w-[70%] sm:w-[25rem] px-4 py-2 rounded-lg cursor-pointer mt-3'>Register</button>

                    {isLoading && <Loader />}
                </form>

                <div className='flex flex-row gap-2 mt-2'>
                    <span>Already have an account?</span>

                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-cyan-700 hover:underline'>Login</Link>
                </div>
            </div>
        </>
    )
}

export default Register