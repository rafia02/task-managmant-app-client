import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routers/Router'
import { Toaster } from 'react-hot-toast'

function App({ children }) {


  return (
    <div>
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  )
}

export default App
