import React, { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { authContext } from '../../Context/Authprovider';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDropzone } from 'react-dropzone'


export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signupEmail, profileupdate } = useContext(authContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()




    const handleShowPassword = () => {
        setOpen(!open)
    }








    const handleSignup = (data) => {

        console.log('Form submitted:', data);

        const fullName = `${data.first_name} ${data.last_name}`


        console.log(fullName)


        const image = data.image[0]
        const formData = new FormData();
        formData.append("image", image);


        signupEmail(data.email, data.password)
            .then(res => {
                console.log(res.user)
                toast.success("Successly sign up")

                fetch("https://api.imgbb.com/1/upload?&key=4d5a64efec46b0e4ba427206e6bcef01", {
                    method: "POST",
                    body: formData
                })
                    .then((res) => res.json())
                    .then((imageData) => {
                        console.log(imageData.data.url)
          
                        profileupdate({ displayName: fullName, photoURL: imageData.data.url})
                            .then(() => { })
                            .catch(e => console.error(e))

                            
                        const userData = {
                            username: fullName,
                            email: data.email,
                            bio: data.bio,
                            image: imageData.data.url
                        }
                        console.log("user info", userData)

                        userPost(userData)
                    })

                    .catch((err) => console.log(err))



            })
            .catch(e => console.error(e))
    };




    function userPost(user) {
        fetch("https://task-managment-app-server.vercel.app/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                navigate("/home")
                console.log(data)
            })
            .catch((e) => console.log(e))
    }







    return (
        <div className='w-4/5 shadow-xl rounded-md mx-auto md:mx-auto md:mx-0 md:w-2/5 pt-5 pb-10 mt-10 mb-20 px-8  border-2 border-opacity-10 border-blue-600 bg-white '>
            <h1 className='text-xl font-bold text-center mb-5'>Sign Up</h1>





            {/* <form onSubmit={handleSubmit(handleProfilePic)} action="" className="flex flex-col items-center">
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-20 h-20 rounded-full  mb-4"
                    />
                )}

                {
                    !selectedImage &&
                    <img className="w-20 h-20 rounded-full  mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWeMk10Jucx-7keCNxddBfx2sfK92_DKbHQ&usqp=CAU" alt="" />

                }

                <div className='flex gap-2 justify-center items-center mb-8'>
                    <input
                        required
                        type="file"
                        {...register("img")}
                        onChange={handleImageChange}
                        className=" p-1 border border-slate-600 rounded"
                    />
                    <button type='submit' className='py-1 px-3 bg-blue-700 rounded-full text-white font-bold'>Selete</button>
                </div>
            </form> */}



            <form onSubmit={handleSubmit(handleSignup)} action="">

                {/* 
            {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-20 h-20 rounded-full  mb-4"
                    />
                )}

                {
                    !selectedImage &&
                    <img className="w-20 h-20 rounded-full  mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWeMk10Jucx-7keCNxddBfx2sfK92_DKbHQ&usqp=CAU" alt="" />

                }

                <div className='flex gap-2 justify-center items-center mb-8'>
                    <input
                        required
                        type="file"
                        {...register("img")}
                        onChange={handleImageChange}
                        className=" p-1 border border-slate-600 rounded"
                    />
                </div> */}





                <div className='grid grid-cols-2 gap-3 mb-3'>
                    <div className='flex flex-col'>
                        <label className='font-semibold '>First Name</label>
                        <input
                            placeholder='First Name'
                            className='mt-1 border-slate-600 p-2 border rounded'
                            type="text"
                            name="first_name"
                            {...register("first_name", { required: true })} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='font-semibold '>Last Name</label>
                        <input
                            placeholder='Last Name'
                            className=' mt-1 border-slate-600 p-2 border rounded'
                            type="text"
                            name="last_name"
                            {...register("last_name", { required: true })} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label className='font-semibold '>Email</label>
                    <input
                        placeholder='Email'
                        className='w-full mt-1 border-slate-600 p-2 border rounded'
                        type="email"
                        name="email"
                        {...register("email", { required: 'email must be requred' })} />
                </div>






                <div className='flex flex-col mt-3'>
                    <label className='font-semibold mb-1'>What do you do?</label>
                    <textarea
                        placeholder='Your bio'
                        className='w-full  border-slate-600 p-2 border rounded'
                        type="text"
                        name="bio"
                        {...register("bio", { required: true })} />
                </div>

                <div className='flex flex-col mt-3'>
                    <label className='font-semibold '>Profile picture</label>
                    <input
                        type="file"
                        {...register("image")}
                        className="w-full mt-1 border-slate-600 p-2 border rounded"
                    />
                </div>

                <div className='flex flex-col my-3'>
                    <label className='font-semibold mb-1'>Password</label>
                    <div className='flex gap-7 items-center'>
                        <input
                            placeholder='Password'
                            className='w-full  border-slate-600 p-2 border rounded'
                            type={open ? "text" : "password"}
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: { value: 6, message: 'you have must 6 characte' },
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'password must be stong and use one special character' }
                            })} />

                        <div onClick={handleShowPassword} className='text-2xl  '>
                            {
                                open ? <BsFillEyeFill></BsFillEyeFill> :
                                    <BsFillEyeSlashFill></BsFillEyeSlashFill>
                            }
                        </div>
                    </div>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                </div>



                <input type="submit" value="Sign Up" className=' text-white font-bold px-4 py-2 text-center w-full mt-5 bg-blue-700 rounded-lg  hover:bg-blue-900 duration-500' />



            </form>

            <p className='mt-1 mb-5'>Don't have an account? Please <Link to="/login" className='text-blue-700 font-bold '>Login</Link></p>
        </div>
    )
}
