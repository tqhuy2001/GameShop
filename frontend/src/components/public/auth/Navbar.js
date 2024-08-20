import React, { useState } from 'react'
import logoPath from '../../../assets/logo.png'
import Search from '../Search'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../stores/actions'
import icons from '../../../utils/icons'
import { useNavigate } from 'react-router-dom'
import { Profile } from './Profile'
import { RechargeCash } from './RechargeCash'
import { GameBought } from './GameBought'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const infoUser = useSelector(state => state.users.currentUser.dataUser)

    const LuMenuSquare = icons.LuMenuSquare
    const TbBrandCashapp = icons.TbBrandCashapp
    const AiOutlineProfile = icons.AiOutlineProfile
    const MdPayment = icons.MdPayment
    const BsCartCheck = icons.BsCartCheck
    const PiSignOut = icons.PiSignOut

    const [menuNavbar, setMenuNavbar] = useState(false)
    const [profile, setProfile] = useState(false)
    const [rechargeCash, setRechargeCash] = useState(false)
    const [gameBought, setGameBought] = useState(false)

    const handleSignOut = () => {
        handleClickMenu()
        dispatch(actions.signOut())
    }

    const handleClickMenu = () => {
        setMenuNavbar(!menuNavbar)
    }

    const handleClickProfile = (state) => {
        if(state) handleClickMenu()
        setProfile(state)
    }
    const handleClickRechargeCash = (state) => {
        if(state) handleClickMenu()
        setRechargeCash(state)
    }
    const handleClickGameBought = (state) => {
        if(state) handleClickMenu()
        setGameBought(state)
    }

    return (
        <div className='z-40 h-[70px] flex bg-zinc-800 pl-[100px] fixed w-screen select-none'>
            <div className={`${profile ? 'block' : 'hidden'}`}><Profile cancel={() => handleClickProfile(false)} /></div>
            <div className={`${rechargeCash ? 'block' : 'hidden'}`}><RechargeCash /></div>
            <div className={`${gameBought ? 'block' : 'hidden'}`}><GameBought /></div>
            <div className={`px-[2px] py-[1px] flex flex-col fixed bg-zinc-700 w-[160px] mt-[70px] right-0 text-gray-300 ${menuNavbar ? 'block' : 'hidden'}`}>
                <div className='py-[3px] cursor-pointer hover:bg-zinc-600 flex items-center' onClick={() => handleClickProfile(true)}>
                    <span className='mr-[4px]'><AiOutlineProfile size={19}/></span>
                    Profile
                </div>
                <div className='py-[3px] cursor-pointer hover:bg-zinc-600 flex items-center' onClick={() => handleClickRechargeCash(true)}>
                    <span className='mr-[4px]'><MdPayment size={19}/></span>
                    Recharge cash
                </div>
                <div className='py-[3px] cursor-pointer hover:bg-zinc-600 flex items-center' onClick={() => handleClickGameBought(true)}>
                    <span className='mr-[4px]'><BsCartCheck size={19}/></span>
                    Game bought
                </div>
                <div className='py-[3px] cursor-pointer hover:bg-zinc-600 flex items-center' onClick={handleSignOut}>
                    <span className='mr-[4px]'><PiSignOut size={19}/></span>
                    Sign out
                </div>
            </div>
            <div className='w-1/6 flex pl-[50px]'>
                <a className='flex w-[140px] justify-center items-center cursor-pointer' onClick={() => navigate('/')}>
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
                        onClick={handleClickMenu}>
                        <LuMenuSquare size={35}/>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Navbar
