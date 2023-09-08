import React, { useContext, useEffect, useState } from 'react'
import { SingleTask } from './SingleTask'
import { authContext } from '../../Context/Authprovider'

export const AllTask = () => {
    const { user } = useContext(authContext)
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch(`https://task-managment-app-server.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }, [user?.email])


    return (
        <div>

            {tasks.length < 1 ? <h1 className='text-xl font-bold text-center mt-6 mb-4'>No task</h1>
                :
                <h1 className='text-xl font-bold text-center mt-6 mb-4'>My tasks</h1>
            }


            <div>
                {
                    tasks.map(task => <SingleTask
                        key={task._id}
                        task={task}>
                    </SingleTask>)
                }
            </div>
        </div>
    )
}
