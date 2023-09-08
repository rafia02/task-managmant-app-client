import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/Authprovider'
import { SingleTask } from '../Task/SingleTask'

export const Pending = () => {
    const { user } = useContext(authContext)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/tasks/filter/pending?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }, [user?.email])


    return (


        <div>
            {data.length < 1 ? <h1 className='text-xl font-bold text-center mb-4'>No Pending Task</h1>
                :
                <h1 className='text-xl font-bold text-center mb-4'>Pending Task</h1>
            }

            {
                data.map(d => <SingleTask task={d}></SingleTask>)
            }
        </div>
    )
}
