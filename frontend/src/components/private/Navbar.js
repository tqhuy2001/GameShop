import React from 'react'
import logoPath from '../../assets/logo.png'
import Search from '../Search'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../stores/actions'
import icons from '../../utils/icons'

const buttonHoverStyle = 'hover:bg-slate-300 hover:text-gray-950'

const Navbar = () => {
    const dispatch = useDispatch()
    const infoUser = useSelector(state => state.users.currentUser.dataUser)

    const FaCartShopping = icons.FaCartShopping
    const TbBrandCashapp = icons.TbBrandCashapp

    const handleSignOut = () => {
        dispatch(actions.signOut())
    }

    return (
        <div className='z-40 h-[70px] flex bg-zinc-800 pl-[100px] fixed w-screen'>
            <div className='w-1/6 flex pl-[50px]'>
                <a className='flex w-[140px] justify-center items-center' href='/'>
                    <img className='w-[100px] h-[60px]' src={logoPath} alt='logo' />
                </a>
            </div>
            <div className='w-1/2 flex items-center pl-[140px]'>
                <Search />
            </div>
            <div className='w-1/3 flex items-center justify-end text-gray-300 pr-[25px]'>
                <a className='flex cursor-pointer'>
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
                </a>
                <div className='flex ml-[15px]'>
                    <button
                        
                        className={`flex w-[100px] h-[32px] border border-slate-300 rounded-lg text-slate-300 font-bold tracking-wider items-center justify-center ${buttonHoverStyle}`}
                    >
                        <FaCartShopping size={16}/>
                        <div className='ml-[6px]'>CART</div>
                    </button>
                    <button
                        onClick={handleSignOut}
                        className={`flex w-[100px] h-[32px] border ml-[15px] border-slate-300 rounded-lg text-slate-300 font-bold tracking-wider items-center justify-center ${buttonHoverStyle}`}
                    >SIGN OUT</button>
                </div>
            </div>  
        </div>
    )
}

export default Navbar
