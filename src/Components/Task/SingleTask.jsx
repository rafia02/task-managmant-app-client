import React from 'react'

export const SingleTask = ({ task }) => {
    const { title, description, dueDate, completed, _id, priority, manager, team_Member } = task
    return (
        <div className='w-4/5 mx-auto'>
            <div key={_id} className=" p-4 shadow-xl shadow-gray-300  mb-20 rounded-lg">
                <div className='flex justify-between mb-3 items-center'>
                    <h2 className="text-xl my-1 font-medium">{title}</h2>
                    <p className='font-bold'>Task Manager : {manager}</p>
                </div>
                <p className="text-gray-600">{description}</p>
                <p className="text-gray-500 mt-3 mb-1">Due Date : {dueDate}</p>
                <p className={`text-${priority} font-semibold`}>Priority: {priority}</p>
                <div className='flex items-center gap-5 my-5'>
                    <p className='tex-xl font-bold'>Assign :</p>

                    {
                        team_Member.map(t => <p className='border border-gray-500 py-[1px] bg-gray-100 px-2 rounded-full' key={t}>{t}</p>)
                    }
                </div>
                <button className='bg-blue-600 rounded-xl mt-5 font-bold text-white  py-1 px-5'>
                    {completed ? 'Completed' : 'In Progress'}
                </button>
            </div>
        </div>
    )
}
