import React from 'react'
import "../../App.css"
import { Link } from 'react-router-dom'

export const Navber = () => {
  const manuItems = <>
  <Link to="/login" className='px-3 py-1 duration-500 font-bold hover:bg-gray-100 text-center rounded  mr-2'>Login</Link>
  <Link to="/signup" className='px-3 py-1 font-bold duration-500 hover:bg-gray-100 text-center rounded '>Regester</Link>
  </>
  return (
    <div className='py-5 px-2'>
      <nav className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold italic' >Task Managment App</h1>
        </div>
        <div>
          {manuItems}
        </div>
      </nav>
    </div>
  )
}
