import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/Authprovider'
import { SingleTask } from "../../Components/Task/SingleTask";
export const Complited = () => {

  const { user } = useContext(authContext)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`https://task-managment-app-server.vercel.app/tasks/filter?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
      .catch(e => console.error(e))
  }, [user?.email])


  return (
    <div>

      {data.length < 1 ? <h1 className='text-xl font-bold text-center mb-4'>No Complited task</h1>
        :
        <h1 className='text-xl font-bold text-center mb-4'>Complited task</h1>
      }

      {
        data.map(d => <SingleTask task={d}></SingleTask>)
      }
    </div>
  )
}
