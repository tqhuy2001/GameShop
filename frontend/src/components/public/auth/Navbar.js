import React, { useState } from 'react'
import logoPath from '../../../assets/logo.png'
import Search from '../Search'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../stores/actions'
import icons from '../../../utils/icons'

const buttonHoverStyle = 'hover:bg-slate-300 hover:text-gray-950'

const Navbar = () => {
    const dispatch = useDispatch()
    const infoUser = useSelector(state => state.users.currentUser.dataUser)

    const LuMenuSquare = icons.LuMenuSquare
    const TbBrandCashapp = icons.TbBrandCashapp

    const [menuProfile, setMenuProfile] = useState(false)

    const handleSignOut = () => {
        handleClickProfile()
        dispatch(actions.signOut())
    }

    const handleClickProfile = () => {
        if(menuProfile) setMenuProfile(false)
        else setMenuProfile(true)
    }

    return (
        <div className='z-40 h-[70px] flex bg-zinc-800 pl-[100px] fixed w-screen select-none'>
            <div className={`px-[5px] py-[1px] flex flex-col fixed bg-zinc-700 w-[160px] mt-[70px] right-0 text-gray-300 ${menuProfile ? 'block' : 'hidden'}`}>
                    <div className='py-[3px] cursor-pointer hover:bg-zinc-600' onClick={handleClickProfile}>Profile</div>
                    <div className='py-[3px] cursor-pointer hover:bg-zinc-600' onClick={handleClickProfile}>Charge cash</div>
                    <div className='py-[3px] cursor-pointer hover:bg-zinc-600' onClick={handleClickProfile}>Game bought</div>
                    <div className='py-[3px] cursor-pointer hover:bg-zinc-600' onClick={handleSignOut}>Sign out</div>
            </div>
            <div className='w-1/6 flex pl-[50px]'>
                <a className='flex w-[140px] justify-center items-center' href='/'>
                    <img className='w-[100px] h-[60px]' src={logoPath} alt='logo' />
                </a>
            </div>
            <div className='w-1/2 flex items-center pl-[140px]'>
                <Search />
            </div>
            <div className='w-1/3 flex items-center justify-end text-gray-300'>
                <div className='flex items-center mr-[20px]'>
                    <div
                        className='flex select-none items-center'>
                            <div className='flex flex-col'>
                                <div className='text-green-500 flex justify-end'>{infoUser.username}</div>
                                <div className='flex items-center justify-end gap-[1px] text-yellow-600'>
                                    <TbBrandCashapp />
                                    {infoUser.cash}
                                </div>
                            </div>
                            <div className='ml-[10px] w-[55px] h-[50px]'>
                                <img className='rounded-full w-full h-full' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${infoUser.avatar}`} alt='avatar' />
                            </div>
                    </div>
                    <div
                        className='text-gray-400 cursor-pointer ml-[20px] flex items-center hover:text-zinc-500'
                        onClick={handleClickProfile}>
                        <LuMenuSquare size={35}/>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Navbar
