import React from 'react'
import { DashbordNavber } from './DashbordNavber'
import { Outlet } from 'react-router-dom'

export const DashbordLayout = () => {
  return (
    <div>
        <DashbordNavber></DashbordNavber>
        <Outlet></Outlet>
    </div>
  )
}
