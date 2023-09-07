import React, { useEffect, useState } from 'react'
import { SingleTask } from './SingleTask'

export const AllTask = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }, [])


    return (
        <div>
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
