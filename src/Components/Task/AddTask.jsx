import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { authContext } from '../../Context/Authprovider';
import { Spinner } from '../Shared/Spinner';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';



export const AddTask = () => {

    const navigate = useNavigate()
    const { user } = useContext(authContext)
    const [members, setMembers] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();



    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMembers(data)

            })
            .catch(e => console.error(e))
    }, [user?.email])


    console.log(members)

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelect = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((selected) => selected !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };



    const onSubmitHandler = (data) => {
        console.log(data)


        const taskData = {
            manager: user.displayName,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            priority: data.priority,
            completed: false,
            team_Member: selectedUsers,
            email: user.email

        }

        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data)
                toast.success("successfully add task")
                reset();
                navigate("/home/alltask")
            })
            .catch((e) => console.log(e))

    };

    console.log(selectedUsers)

    return (
        <div className='w-full px-4 mt-6 md:w-2/3 mx-auto'>
            <h1 className='text-xl mb-3 font-bold text-center'>Add a new task</h1>

            <div className=" rounded-lg p-4 shadow-md shadow-gray-400">
                <form className='px-5' onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        />
                        {errors.title && <p className="text-red-500 mt-2">Title is required</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        />
                        {errors.description && <p className="text-red-500 mt-2">Description is required</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Due Date</label>
                        <input
                            type="date"
                            {...register("dueDate", { required: true })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        />
                        {errors.dueDate && <p className="text-red-500 mt-2">Due Date is required</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Priority</label>
                        <select
                            {...register("priority", { required: true })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.priority ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {errors.priority && <p className="text-red-500 mt-2">Priority is required</p>}
                    </div>



                    <div>


                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Selected Team Members:</h3>
                            <div className="border flex gap-2 w-full px-3 py-5 mt-2 border-gray-600 rounded-md">
                                {selectedUsers.map((user) => (
                                    <p className='bg-blue-500 text-white font-bold rounded-lg py-1 px-2'>{user}</p>
                                ))}
                            </div>
                        </div>

                        <div className="mt-2 space-y-2">
                            {members?.map((user) => (

                                <label key={user} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.username)}
                                        onChange={() => handleUserSelect(user.username)}
                                        className="text-blue-600"
                                    />
                                    <option>{user.username}</option>
                                </label>
                            ))}
                        </div>

                    </div>




                    <div className="text-center mt-5">
                        <button
                            type="submit"
                            className="text-white font-bold px-4 py-2 text-center w-full mt-5 bg-blue-700 rounded-lg  hover:bg-blue-900 duration-500"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
