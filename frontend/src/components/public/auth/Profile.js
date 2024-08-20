import React, { useState } from 'react'
import { ChangePassword, InfoUser, UpdateAvatar } from './profile'

export const Profile = ({ cancel }) => {
    const [tabDisplay, setTabDisplay] = useState({
        infoUser: true,
        updateAvatar: false,
        changePassword: false,
    })

    const handleInfoUser = () => {
        setTabDisplay({
            infoUser: true,
            updateAvatar: false,
            changePassword: false,
        })
    }
    const handleUpdateAvatar = () => {
        setTabDisplay({
            infoUser: false,
            updateAvatar: true,
            changePassword: false,
        })
    }
    const handleChangePassword = () => {
        setTabDisplay({
            infoUser: false,
            updateAvatar: false,
            changePassword: true,
        })
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40`}>
        <div className='w-1/2 h-3/4 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col text-gray-300 justify-between items-center'>
            <div className='w-full flex px-[10px]'>
                <div className='w-full flex justify-center font-bold text-[25px] border-b border-gray-500 py-[5px]'>PROFILE</div>
            </div>
            <div className='w-full h-full flex'>
                <div className='w-[27%] border-r h-full flex flex-col border-gray-500 gap-[5px]'>
                    <div 
                        className={`w-auto flex h-[13%] items-center cursor-pointer hover:bg-zinc-800 mt-[5px] pl-[10px] text-[18px] ${tabDisplay.infoUser ? 'bg-zinc-800' : null}`}
                        onClick={handleInfoUser}
                    >Info User</div>
                    <div 
                        className={`w-auto flex h-[13%] items-center cursor-pointer hover:bg-zinc-800 pl-[10px] text-[18px] ${tabDisplay.updateAvatar ? 'bg-zinc-800' : null}`}
                        onClick={handleUpdateAvatar}
                    >Update Avatar</div>
                    <div 
                        className={`w-auto flex h-[13%] items-center cursor-pointer hover:bg-zinc-800 pl-[10px] text-[18px] ${tabDisplay.changePassword ? 'bg-zinc-800' : null}`}
                        onClick={handleChangePassword}
                    >Change Password</div>
                </div>
                <div className='w-[73%] h-full flex flex-col'>
                    {tabDisplay.infoUser ? <InfoUser cancel={cancel}/> : (tabDisplay.updateAvatar ? <UpdateAvatar cancel={cancel}/> : <ChangePassword cancel={cancel}/>)}
                </div>
            </div>
        </div>
    </div>
  )
}
