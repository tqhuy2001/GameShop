import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import SideBarLeft from '../../components/SideBarLeft'

const Public = () => {
  return (
    <div className='flex flex-col'>
        <Navbar />
        <div className='mt-[70px]'>
          <div className='flex bg-gray-500 h-[1000px]'>
              <SideBarLeft />
              <div className='ml-[300px]'>
                <Outlet />
              </div>
          </div>
        </div>
    </div>
  )
}

export default Public
