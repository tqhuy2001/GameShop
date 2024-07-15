import React from 'react'
import menuSideBarLeft from '../utils/menuSideBarLeft'
import { NavLink } from 'react-router-dom'
import icons from '../utils/icons'
import styles from '../mystyle.module.css'

const notActiveStyle = `flex py-[13px] items-center text-lg tracking-wide mb-[1px] hover:text-yellow-600 ${styles.bg_hover}`
const activeStyle = 'bg-zinc-800 text-yellow-600 flex py-[13px] items-center text-lg tracking-wide mb-[1px]'

const FaFacebookF = icons.FaFacebookF
const FaYoutube = icons.FaYoutube
const FaInstagramSquare = icons.FaInstagramSquare

const facebookLink = 'https://www.facebook.com/huy.trinhquang.5203'
const youtubeLink = 'https://www.youtube.com/channel/UCNkioQhS4ZxVV5BC2p3VCFw'
const igLink = 'https://www.instagram.com/huy.tq307/'

const SideBarLeft = () => {

  return (
    <div className='fixed top-[70px] border-r-[1px] border-gray-500 text-gray-300 flex flex-col w-[275px] h-screen justify-between'>
        <div className='mt-[8px] flex flex-col'>
            {menuSideBarLeft.map((item, index) => (
                <NavLink
                    className={({isActive}) => (isActive ? activeStyle : notActiveStyle)}
                    key={index}
                    to={item.path}
                >
                    <div className='flex z-10 pl-[35px]'>
                        {item.icon}
                        <span className='ml-[10px]'>{item.text}</span>
                    </div>
                </NavLink>
            ))}
        </div>
        <div className='pb-[75px] text-[13px] pl-4'>
            <div className='flex pb-[8px]'>
                <NavLink
                    to={facebookLink}
                    target='_blank'
                    className='w-[32px] h-[32px] border pt-[2px] pl-[5px] rounded-full mr-4 flex items-center'
                ><FaFacebookF size={20}/></NavLink>
                <NavLink
                    to={youtubeLink}
                    target='_blank'
                    className='w-[32px] h-[32px] border rounded-full mr-4 flex justify-center items-center'
                ><FaYoutube size={20}/></NavLink>
                <NavLink
                    to={igLink}
                    target='_blank'
                    className='w-[32px] h-[32px] border rounded-full mr-4 flex justify-center items-center'
                ><FaInstagramSquare size={19}/></NavLink>
            </div>
            <p>© 2024 GameShop</p>
            <p>Founded and developed by TQH</p>
        </div>
    </div>
  )
}

export default SideBarLeft
