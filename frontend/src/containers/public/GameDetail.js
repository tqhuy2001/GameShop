import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useResolvedPath } from 'react-router-dom'
import icons from '../../utils/icons'

const GameDetail = () => {
    const url = useResolvedPath().pathname
    let gameId = url.match(/\d/g);
    gameId = gameId.join('')

    const FaChevronRight = icons.FaChevronRight
    const FaChevronLeft = icons.FaChevronLeft
    const [currentImage, setCurrentImage] = useState(0)

    const allGames = useSelector(state => state.games.allGames?.data)
    let selectGame
    selectGame = allGames.filter((game) => game.id == gameId)
    selectGame = selectGame[0]
    
    let images = [selectGame?.main_image]
    if(selectGame.images.length !== 0) images.push(...selectGame.images)

    const handlePrevImage = () => {
        if(currentImage === 0) setCurrentImage(images.length - 1)
        else setCurrentImage(prev => prev - 1)
    }
    const handleNextImage = () => {
        if(currentImage === images.length - 1) setCurrentImage(0)
            else setCurrentImage(prev => prev + 1)
    }
    return (
        <div className='flex flex-col w-full px-[15px]'>
            <div className='text-gray-100 text-[60px] items-start font-bold w-full mb-[15px] border-b border-gray-400'>
                {selectGame?.name}
            </div>
            <div className='w-full flex justify-between items-center'>
                <div className='flex w-[931px] text-gray-300 absolute justify-between items-center select-none'>
                    <div 
                        className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-500 text-gray-500 hover:border-white hover:text-white cursor-pointer'
                        onClick={handlePrevImage}
                    ><FaChevronLeft size={30}/></div>
                    <div 
                        className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-400 text-gray-500 hover:border-white hover:text-white cursor-pointer'
                        onClick={handleNextImage}
                    ><FaChevronRight size={30}/></div>
                </div>
                <img className='w-full h-[530px]' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${images[currentImage]}`} alt='main-image' />
            </div>
        </div>
    )
}

export default GameDetail