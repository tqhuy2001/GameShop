import React from 'react'
import logoPath from '../../../assets/logo.png'
import Search from '../Search'
import { NavLink, useNavigate } from 'react-router-dom'
import path from '../../../utils/path'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='z-40 h-[70px] flex bg-zinc-800 fixed w-screen select-none items-center'>
      <div className='w-1/6'>
        <a className='flex justify-center items-center cursor-pointer w-full' onClick={() => navigate('/')}>
            <img className='w-[100px] h-[60px]' src={logoPath} alt='logo' />
        </a>
      </div>
      <div className='w-2/3 flex items-center justify-center'>
        <Search />
      </div>
      <div className='w-1/6 flex items-center justify-center'>
        <div className='flex'>
          <NavLink
            to={path.log_in}
            className={`flex w-[100px] h-[32px] text-[18px] border border-slate-300 rounded-lg text-gray-300 font-bold items-center justify-center hover:bg-white hover:bg-opacity-[7%]`}
          >LOG IN</NavLink>
          <NavLink
            to={path.sign_up}
            className={`flex w-[100px] h-[32px] text-[18px] border ml-[15px] border-slate-300 rounded-lg text-gray-300 font-bold items-center justify-center hover:bg-white hover:bg-opacity-[7%]`}
          >SIGN UP</NavLink>
        </div>
      </div>
        
    </div>
  )
}

export default Navbar
