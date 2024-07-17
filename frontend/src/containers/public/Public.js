import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarLeft, Community } from '../../components'
import { PrivateNavbar } from '../../components/private'
import { PublicNavbar } from '../../components/public'
import { useSelector } from 'react-redux'

const Public = () => {
  const isLoggedIn = useSelector(state => state.users.login.success)
  
  return (
    <div className='flex flex-col'>
        {isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />}
        <div className='flex min-h-screen bg-zinc-950 mt-[70px]'>
            <SideBarLeft />
            <div className='flex ml-[300px] mr-[25px] w-full justify-center mt-[20px]'>
              <Outlet />
            </div>
            <Community />
        </div>
    </div>
  )
}

export default Public
