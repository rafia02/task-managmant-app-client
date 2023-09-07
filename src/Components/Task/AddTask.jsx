import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { authContext } from '../../Context/Authprovider';
export const AddTask = () => {
    const {user} = useContext(authContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmitHandler = (data) => {
        console.log(data)

        const taskData ={
            manager: user?.displayName,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            priority: data.priority,
            completed: false

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
            })
            .catch((e) => console.log(e))

    };


    return (
        <div className='w-full px-8 py-5 md:w-1/2 mx-auto'>
            <div className=" rounded-lg p-4 shadow-md shadow-gray-400">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
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

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
