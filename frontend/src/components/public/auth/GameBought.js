import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export const GameBought = ({ cancel }) => {
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)
  console.log(gamesBought)
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40`}>
      <div className='w-1/2 max-h-3/4 h-3/4 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col text-gray-300 justify-between items-center'>
          <div className='w-full flex px-[10px]'>
              <div className='w-full flex justify-center font-bold text-[25px] border-b border-gray-500 py-[5px]'>GAMES BOUGHT</div>
          </div>
          <div className='h-full w-full px-[5px] overflow-scroll'>
            <table className='w-full h-full'>
              <thead className=''>
                <tr className='text-[23px] sticky top-0 bg-zinc-900'>
                  <th className='py-[5px] w-[70px] text-center'>ID</th>
                  <th className='py-[5px] text-center'>Game</th>
                  <th className='py-[5px] w-[230px] text-center'>Bought at</th>
                </tr>
              </thead>
              <tbody className='text-[17px]'>
                {gamesBought.map((item, index) => (
                  <tr key={index} >
                    <td className='py-[10px] w-[70px] flex justify-center'>{index + 1}</td>
                    <td className='py-[10px] pl-[20px]'>
                      <NavLink
                        className='hover:underline truncate'
                        to={item.download_link}
                        target='_blank'
                      >{item.name}</NavLink>
                    </td>
                    <td className='w-[230px] py-[10px] text-center'>{item.bought_at.slice(0, item.bought_at.indexOf('T'))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
