import React, { useContext, useEffect, useState } from 'react'
import { Navber } from '../Components/Shared/Navber'
import { Link, Outlet } from 'react-router-dom'
import { authContext } from '../Context/Authprovider'

export const HomeLayout = () => {
    const { user } = useContext(authContext)
    const [data, setData] = useState({})
    console.log(user)
    const items = <>
        <Link to="/home/dashbord" className=' font-bold'><li><a>Dashbord</a></li></Link>
        <Link to="/home/addtask" className=' font-bold'><li><a>Add task</a></li></Link>
        <Link to="/home/alltask" className=' font-bold'><li><a>My task</a></li></Link>
        <Link to="/home/addteam" className=' font-bold'><li><a>Add Team Workplace</a></li></Link>

    </>



    useEffect(() => {
        fetch(`https://task-managment-app-server.vercel.app/users/id?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }, [user?.email])

    return (
        <div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">

                    <Outlet></Outlet>


                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <div className='flex flex-col py-5 bg-gray-100 items-center justify-center'>
                        <img className='w-20 h-20 mb-3 rounded-full' src={user?.photoURL} alt="" />
                        <h1 className='text-xl font-bold capitalize'>{data.bio}</h1>
                    </div>

                    <ul className="menu  p-4 w-80 min-h-full bg-gray-100 text-base-content">
                        {/* Sidebar content here */}
                        {items}

                    </ul>

                </div>
            </div>
        </div>
    )
}
