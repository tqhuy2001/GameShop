import React from 'react'
import logoPath from '../../../assets/logo.png'
import Search from '../Search'
import { NavLink, useNavigate } from 'react-router-dom'
import path from '../../../utils/path'

const buttonHoverStyle = 'hover:bg-slate-300 hover:text-gray-950'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='z-40 h-[70px] flex bg-zinc-800 pl-[100px] fixed w-screen select-none'>
      <div className='w-1/6 flex pl-[50px]'>
        <a className='flex w-[140px] justify-center items-center cursor-pointer' onClick={() => navigate('/')}>
            <img className='w-[100px] h-[60px]' src={logoPath} alt='logo' />
        </a>
      </div>
      <div className='w-1/2 flex items-center pl-[140px]'>
        <Search />
      </div>
      <div className='w-1/3 flex items-center justify-center'>
        <div className='pl-[60px] flex'>
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
