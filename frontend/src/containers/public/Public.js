import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import SideBarLeft from '../../components/SideBarLeft'
import Community from '../../components/Community'

const Public = () => {
  return (
    <div className='flex flex-col'>
        <Navbar />
        <div className='flex min-h-screen bg-zinc-950 mt-[70px]'>
            <SideBarLeft />
            <div className='flex ml-[300px] mr-[25px] w-full justify-center'>
              <Outlet />
            </div>
            <Community />
        </div>
    </div>
  )
}

export default Public
