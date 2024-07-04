import React from 'react'
import menuSideBarLeft from '../utils/menuSideBarLeft'
import { NavLink } from 'react-router-dom'
import icons from '../utils/icons'

const notActiveStyle = 'flex py-[13px] pl-[35px] items-center text-lg tracking-wide hover:text-yellow-600'
const activeStyle = 'bg-gray-300 text-yellow-600 flex py-[13px] pl-[35px] items-center text-lg tracking-wide'

const FaFacebookF = icons.FaFacebookF
const FaYoutube = icons.FaYoutube
const FaInstagramSquare = icons.FaInstagramSquare

const facebookLink = 'https://www.facebook.com/huy.trinhquang.5203'
const youtubeLink = 'https://www.youtube.com/channel/UCNkioQhS4ZxVV5BC2p3VCFw'
const igLink = 'https://www.instagram.com/huy.tq307/'

const SideBarLeft = () => {

  return (
    <div className='fixed top-[70px] border-r-[1px] border-gray-400 text-slate-300 bg-gray-500 flex flex-col w-[275px] h-screen justify-between'>
        <div className='mt-[8px] flex flex-col'>
            {menuSideBarLeft.map((item, index) => (
                <NavLink
                    className={({isActive}) => (isActive ? activeStyle : notActiveStyle)}
                    key={index}
                    to={item.path}
                >
                    {item.icon}
                    <span className='ml-[10px]'>{item.text}</span>
                </NavLink>
            ))}
        </div>
        <div className='mb-[73px] text-sm pl-4'>
            <div className='flex pb-[8px]'>
                <NavLink
                    to={facebookLink}
                    target='_blank'
                    className='w-[35px] h-[35px] border pl-[4px] rounded-full mr-4 flex items-center'
                ><FaFacebookF size={23}/></NavLink>
                <NavLink
                    to={youtubeLink}
                    target='_blank'
                    className='w-[35px] h-[35px] border rounded-full mr-4 flex justify-center items-center'
                ><FaYoutube size={24}/></NavLink>
                <NavLink
                    to={igLink}
                    target='_blank'
                    className='w-[35px] h-[35px] border rounded-full mr-4 flex justify-center items-center'
                ><FaInstagramSquare size={22}/></NavLink>
            </div>
            <p>© 2024 GameShop</p>
            <p>Founded and developed by TQH</p>
        </div>
    </div>
  )
}

export default SideBarLeft
