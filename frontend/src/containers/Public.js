import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarLeft, Community } from '../components/public'
import { PrivateNavbar } from '../components/public/auth'
import { PublicNavbar } from '../components/public/notAuth'
import { useState, useEffect } from 'react'
import styles from '../mystyle.module.css'
import { useSelector } from 'react-redux'

const Public = () => {
  const authenticated = useSelector(state => state.users.login.authenticated)

  const [widthwindow, setWidthWindow] = useState(window.innerWidth)

  useEffect(() => {
    function updateSize() {
      setWidthWindow(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
  })

  return (
    <div className='flex flex-col w-full'>
      {authenticated ? <PrivateNavbar /> : <PublicNavbar />}
      <div className='w-full flex mt-[70px]'>
          <SideBarLeft />
          <div id='outlet' className={`flex w-full ml-[300px] ${widthwindow > 1400 ? styles.outlet_community_appear : styles.outlet_community_fadeout} mt-[20px] mb-[30px]`}>
            <Outlet/>
          </div>
          <div className={`fixed mt-[20px] ${widthwindow > 1400 ? styles.community_appear : styles.community_fadeout}`}><Community /></div>
      </div>
    </div>
  )
}

export default Public
