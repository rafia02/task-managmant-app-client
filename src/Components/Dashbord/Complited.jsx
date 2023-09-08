import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/Authprovider'
import {SingleTask} from "../../Components/Task/SingleTask";
export const Complited = () => {

  const {user} =  useContext(authContext)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/filter?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
      .catch(e => console.error(e))
  }, [user?.email])


  return (
    <div>
         <h1 className='text-xl font-bold text-center mb-5'>Complited task</h1>
      {
        data.map(d =><SingleTask task={d}></SingleTask>)
      }
    </div>
  )
}
