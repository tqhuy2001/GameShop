import React from 'react'
import logoPath from '../assets/logo.png'
import Search from './Search'
import { NavLink } from 'react-router-dom'
import path from '../utils/path'

const buttonHoverStyle = 'hover:bg-slate-300 hover:text-gray-950'

const Navbar = () => {
  return (
    <div className='z-50 h-[70px] flex bg-gray-950 px-[100px] fixed w-screen'>
      <div className='w-1/4 flex pl-[50px]'>
        <a className='flex w-[140px] justify-center items-center' href='/'>
            <img className='w-[100px] h-[60px]' src={logoPath} alt='logo' />
        </a>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <Search />
      </div>
      <div className='w-1/4 flex items-center justify-center'>
        <div className='pl-[100px] flex'>
          <NavLink
            to={path.log_in}
            className={`flex w-[100px] h-[32px] border border-slate-300 rounded-lg text-slate-300 font-bold tracking-wider items-center justify-center ${buttonHoverStyle}`}
          >LOG IN</NavLink>
          <NavLink
            to={path.sign_up}
            className={`flex w-[100px] h-[32px] border ml-[15px] border-slate-300 rounded-lg text-slate-300 font-bold tracking-wider items-center justify-center ${buttonHoverStyle}`}
          >SIGN UP</NavLink>
        </div>
      </div>
        
    </div>
  )
}

export default Navbar
