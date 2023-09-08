import React from 'react'
import { Link } from 'react-router-dom'

export const DashbordNavber = () => {
    const dashMenu = <>
        <Link to="/home/dashbord/complited" className='px-3 py-1 font-bold duration-500 hover:bg-gray-100 text-center rounded '>Completed</Link>

        <Link to="/home/dashbord/pending" className='px-3 py-1 font-bold duration-500 hover:bg-gray-100 text-center rounded '>Pending</Link>

    </>
    return (
        <div className='my-6'>
            <nav>
                <ul className='md:px-10'>
                    {dashMenu}
                </ul>
            </nav>
        </div>
    )
}
