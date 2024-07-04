import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import SideBarLeft from '../../components/SideBarLeft'
import Community from '../../components/Community'

const Public = () => {
  return (
    <div className='flex flex-col'>
        <Navbar />
        <div className='mt-[70px]'>
          <div className='flex h-min-screen bg-gray-500'>
              <SideBarLeft />
              <div className='flex ml-[300px] mt-[15px] mr-[25px] w-full'>
                <Outlet />
              </div>
              <Community />
          </div>
        </div>
    </div>
  )
}

export default Public
