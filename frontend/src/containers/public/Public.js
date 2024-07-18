import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarLeft, Community } from '../../components'
import { PrivateNavbar } from '../../components/private'
import { PublicNavbar } from '../../components/public'
import { Loading } from '../../components'

const Public = (props) => {
  const authenticated = props.authenticated
  return (
    <div className='flex flex-col'>
      {authenticated ? <PrivateNavbar /> : <PublicNavbar />}
      <div className='flex min-h-screen mt-[70px]'>
          <SideBarLeft />
          <div className='flex w-full ml-[300px] mr-[25px] mt-[20px]'>
            <Outlet />
          </div>
          <div className=''><Community /></div>
      </div>
    </div>
  )
}

export default Public
