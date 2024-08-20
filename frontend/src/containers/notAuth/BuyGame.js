import React, { useState } from 'react'
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom'

export const BuyGame = ({ currentGame }) => {
    const navigate = useNavigate()

    const GiCancel = icons.GiCancel

    const [report, setReport] = useState(false)

    const handleBuyGame = () => {
        setReport(true)
    }
    return (
        <div className={`w-full flex flex-col items-center py-[10px]`}>
            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${report ? 'block' : 'hidden'}`}>
                <div className='relative w-1/3 h-1/3 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col px-[8px] py-[13px] text-gray-300 justify-between items-center'>
                    <div className='flex flex-col items-center w-full'>
                        <div className='mt-[10px] mb-[25px] font-bold text-[30px]'>Please login to buy game</div>
                        <span className='text-red-500 mb-[15px]'><GiCancel size={50}/></span>
                        <div className='text-[15px]'>
                            Come to
                            <a className='ml-[3px] underline cursor-pointer hover:text-blue-500' onClick={() => navigate('/login')}>Login</a>
                            . Don't have an account?
                            <a className='ml-[3px] underline cursor-pointer hover:text-blue-500' onClick={() => navigate('/signup')}>Signup</a>
                        </div>
                    </div>
                    <div className='w-full flex gap-[120px] justify-center'>
                        <button 
                            onClick={() => setReport(false)}
                            className='text-gray-300 flex justify-center items-center w-[100px] h-[30px] border border-gray-600 rounded-lg font-bold text-[17px] bg-blue-700 hover:bg-opacity-70'
                        >OK</button>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center font-bold text-[30px] mb-[10px]'>{`Buy ${currentGame.name}`.toUpperCase()}</div>
            <div className='flex flex-col w-full items-center'>
                <div className={`w-1/2 flex border border-gray-500 justify-between px-[2px] py-[2px] h-[40px] bg-gray-700 bg-opacity-60 rounded-xl`}>
                    <div className='w-1/2 mr-[2px] flex items-center justify-center'>{currentGame.price === 0 ? 'FREE' : `PRICE: ${currentGame.price}$`}</div>
                    <button 
                        className='flex justify-center bg-green-600 w-1/2 rounded-xl items-center ml-[2px] select-none cursor-pointer hover:bg-opacity-70'
                        onClick={handleBuyGame}
                    >Buy Game</button>
                </div>
                <div className='mt-[10px] text-[15px] italic'>Please like the game for everyone knows if it's a nice game. Leave comments or contact with us if you have any question</div>
            </div>
        </div>
  )
}
