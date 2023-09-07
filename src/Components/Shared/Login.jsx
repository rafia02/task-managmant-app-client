import React, { useContext, useState } from 'react'
import { authContext } from '../../Context/Authprovider';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const Login = () => {
    const { loginEmail } = useContext(authContext)
    const [err, setErr] = useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'


    const handleLogin = (data) => {
        loginEmail(data.email, data.password)
            .then(res => {
                console.log(res.user)
                setErr("")
                toast.success('Sucessfuly log in')
                navigate(from, { replace: true })
            })
            .catch(e => {
                setErr(e.code.split('auth/'))
                console.error(e.message)
            })
    }



    return (
        <div className='w-4/5 shadow-xl rounded-md mx-auto md:mx-auto md:mx-0 md:w-2/5 pt-5 pb-10 mt-10 mb-20 px-8  border-2 border-opacity-10 border-blue-600 bg-white'>
            <h1 className='text-xl font-bold text-center mb-5'>Login</h1>


            <form onSubmit={handleSubmit(handleLogin)} action="">
                <div className='flex flex-col'>
                    <label className='font-semibold '>Email</label>
                    <input
                        placeholder='Email'
                        className='w-full mt-1 border-slate-600 p-2 border rounded'
                        type="email" name="email"
                        {...register("email", { required: "Email Address is required" })} />
                    {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                </div>

                <div className='flex flex-col my-3'>
                    <label className='font-semibold mb-1'>Password</label>
                    <input
                        placeholder='Password'
                        className='w-full  border-slate-600 p-2 border rounded'
                        type="password"
                        name="password"
                        {...register("password")} />
                    {err && <p className='text-red-600' role="alert">{err}</p>}
                </div>

                <input type="submit" value="Sign Up" className=' text-white font-bold px-4 py-2 text-center w-full mt-5 bg-blue-700 rounded-lg  hover:bg-blue-900 duration-500' />

            </form>

            <div className='text-center text-xl font-bold mb-2'> or</div>

            <div className='text-center mb-1 w-full rounded-lg border-2 border-blue-800  hover:bg-blue-100 text-blue-900 duration-500 '>
                <button type="submit" className=" font-bold px-4 py-1 ">Continue with google</button>
            </div>
            <p>Don't have an account? Please <Link to="/signup" className='text-blue-700 font-bold'>Sing up</Link></p>
        </div>
    )
}
