import React, { useContext } from 'react'
import { Navber } from '../Components/Shared/Navber'
import { Link, Outlet } from 'react-router-dom'
import { authContext } from '../Context/Authprovider'

export const HomeLayout = () => {
    const { user } = useContext(authContext)

    const items = <>
        <Link to="/home/addtask" className=' font-bold'><li><a>Add task</a></li></Link>
        <Link to="/home/alltask" className=' font-bold'><li><a>All task</a></li></Link>
        <Link to="/home/addteam" className=' font-bold'><li><a>Add Team Workplace</a></li></Link>

    </>


    return (
        <div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">

                    <Outlet></Outlet>


                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <img src="" alt="" />
                    <ul className="menu p-4 w-80 min-h-full bg-gray-100 text-base-content">
                        {/* Sidebar content here */}
                        {items}

                    </ul>

                </div>
            </div>
        </div>
    )
}
