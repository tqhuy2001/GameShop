import React, { useState } from 'react'
import { buyGame } from '../../apis/users'
import icons from '../../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../../stores/actions'

export const BuyGame = ({ currentUser, gameId, currentGame }) => {

    const BsQuestionCircle = icons.BsQuestionCircle
    const SiTicktick = icons.SiTicktick
    const GiCancel = icons.GiCancel

    const [report, setReport] = useState(false)
    const [successReport, setSuccessReport] = useState(false)
    const [failedReport, setFailedReport] = useState(false)
    const [detailError, setDetailError] = useState('')

    const dispatch = useDispatch()

    const handleReport = () => {
        setReport(true)
    }

    const handleSuccess = () => {
        setSuccessReport(false)
        dispatch(actions.getExistedLogin())
    }

    const handleBuyGame = async () => {
        setReport(false)
        try {
            const response = await buyGame(gameId)
            setSuccessReport(true)
        } catch (error) {
            setDetailError(error.response.data.detail)
            setFailedReport(true)
        }
    }

    return (
        <div className={`w-full flex flex-col items-center py-[10px]`}>
            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${report ? 'block' : 'hidden'}`}>
                <div className='relative w-1/3 h-1/3 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col px-[8px] py-[13px] text-gray-300 justify-between items-center'>
                    <div className='flex flex-col items-center w-full'>
                        <div className='mt-[10px] font-bold text-[25px]'>Do you want to buy this game</div>
                        <div className='mt-[10px] mb-[25px]'>You need to pay {currentGame.price}$ for this buying</div>
                        <BsQuestionCircle size={45}/>
                    </div>
                    <div className='w-full flex gap-[120px] justify-center'>
                        <button 
                            onClick={handleBuyGame}
                            className='text-gray-300 flex justify-center items-center w-[100px] h-[30px] border border-gray-600 rounded-lg font-bold text-[17px] bg-blue-700 hover:bg-opacity-70'
                        >OK</button>
                        <button 
                            onClick={() => setReport(false)}
                            className='text-gray-300 flex justify-center items-center w-[100px] h-[30px] border border-gray-600 rounded-lg font-bold text-[17px] bg-red-700 hover:bg-opacity-70'
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${successReport ? 'block' : 'hidden'}`}>
                <div className='relative w-1/3 h-1/3 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col px-[8px] py-[13px] text-gray-300 justify-between items-center'>
                    <div className='flex flex-col items-center w-full'>
                        <div className='mt-[10px] mb-[35px] font-bold text-[25px]'>You bought this game successfully</div>
                        <span className='text-green-500'><SiTicktick size={50}/></span>
                    </div>
                    <div className='w-full flex gap-[120px] justify-center'>
                        <button 
                            onClick={handleSuccess}
                            className='text-gray-300 flex justify-center items-center w-[100px] h-[30px] border border-gray-600 rounded-lg font-bold text-[17px] bg-blue-700 hover:bg-opacity-70'
                        >OK</button>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${failedReport ? 'block' : 'hidden'}`}>
                <div className='relative w-1/3 h-1/3 bg-zinc-900 rounded-xl border border-gray-500 flex flex-col px-[8px] py-[13px] text-gray-300 justify-between items-center'>
                    <div className='flex flex-col items-center w-full'>
                        <div className='mt-[10px] font-bold text-[20px]'>{detailError.substring(0, detailError.indexOf('.'))}</div>
                        <div className='mb-[25px] font-bold text-[20px]'>{detailError.substring(detailError.indexOf('.') + 2, detailError.length)}</div>
                        <span className='text-red-500'><GiCancel size={50}/></span>
                    </div>
                    <div className='w-full flex gap-[120px] justify-center'>
                        <button 
                            onClick={() => setFailedReport(false)}
                            className='text-gray-300 flex justify-center items-center w-[100px] h-[30px] border border-gray-600 rounded-lg font-bold text-[17px] bg-blue-700 hover:bg-opacity-70'
                        >OK</button>
                    </div>
                </div>
            </div>
        
            <div className='flex w-full justify-center font-bold text-[30px] mb-[10px]'>{`Buy ${currentGame.name}`.toUpperCase()}</div>
            {!currentUser.gamesBought.includes(Number(gameId)) ?
            <div className='flex flex-col w-full items-center'>
                <div className={`w-1/2 flex border border-gray-500 justify-between px-[2px] py-[2px] h-[40px] bg-gray-700 bg-opacity-60 rounded-xl`}>
                    <div className='w-1/2 mr-[2px] flex items-center justify-center'>{currentGame.price === 0 ? 'FREE' : `PRICE: ${currentGame.price}$`}</div>
                    <button 
                        className='flex justify-center bg-green-600 w-1/2 rounded-xl items-center ml-[2px] select-none cursor-pointer hover:bg-opacity-70'
                        onClick={handleReport}
                    >Buy Game</button>
                </div>
                <div className='mt-[10px] text-[15px] italic'>Please like the game for everyone knows if it's a nice game. Leave comments or contact with us if you have any question</div>
            </div> :
            <div className='flex flex-col items-center'>
                <div className='text-[15px] italic'>You have bought on this game. Please go to game bought tag on menu to re-download if you want</div>
                <div className='text-[15px] italic'>Please like the game for everyone to know if it's a nice game. Leave comments or contact with us if you have any question</div>
                <div className='text-[15px] italic'>Thanks for your purchasing!</div>
            </div>}
        </div>
  )
}
