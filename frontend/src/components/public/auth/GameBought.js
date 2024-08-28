import React from 'react'
import { useSelector } from 'react-redux'

export const GameBought = ({ cancel }) => {
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)
  console.log(gamesBought)
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40`}>
      <div className='w-1/2 h-3/4 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col text-gray-300 justify-between items-center'>
          <div className='w-full flex px-[10px]'>
              <div className='w-full flex justify-center font-bold text-[25px] border-b border-gray-500 py-[5px]'>GAMES BOUGHT</div>
          </div>
          <div className='h-full w-full'></div>
          <div className='flex w-full justify-center pb-[10px]'>
            <button 
              className='w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
              onClick={cancel}
            >Cancel</button>
        </div>
      </div>
    </div>
  )
}
