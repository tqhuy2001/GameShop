import React from 'react'
import { useSelector } from 'react-redux'

const InfoUser = ({ cancel }) => {

  const currentUser = useSelector(state => state.users.currentUser)

  return (
    <div className='flex flex-col w-full h-full'>
        <div className='flex flex-col w-full h-full px-[10px] py-[10px] items-center'>
          <img className='w-[110px] mt-[15px] h-[110px] rounded-full' src={currentUser.dataUser.avatar} alt='avatar'/>
          <div className='mt-[30px] flex'>
            <div className='flex flex-col gap-[10px]'>
              <div className='ml-[10px] text-[20px] flex font-bold'>Display name/Username</div>
              <div className='ml-[10px] text-[20px] flex font-bold'>Email</div>
              <div className='ml-[10px] text-[20px] flex font-bold'>Cash</div>
              <div className='ml-[10px] text-[20px] flex font-bold'>Account type</div>
              <div className='ml-[10px] text-[20px] flex font-bold'>Games Bought</div>
              <div className='ml-[10px] text-[20px] flex font-bold'>Created At</div>
            </div>
            <div className='ml-[10px] flex flex-col gap-[10px]'>
              <div className='ml-[5px] text-green-500 text-[20px]'>{currentUser.dataUser.username}</div>
              <div className='ml-[5px] text-[20px]'>{currentUser.dataUser.email}</div>
              <div className='ml-[5px] text-[20px]'>{currentUser.dataUser.cash}$</div>
              <div className='ml-[5px] text-[20px]'>{currentUser.dataUser.permission}</div>
              <div className='ml-[5px] text-[20px]'>{currentUser.gamesBought.length}</div>
              <div className='ml-[5px] text-[20px]'>{currentUser.dataUser.create_at.substring(0, currentUser.dataUser.create_at.indexOf('T'))}</div>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end px-[10px] pb-[10px]'>
          <button 
            className='w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
            onClick={cancel}
          >Cancel</button>
        </div>
        
    </div>
  )
}

export default InfoUser
