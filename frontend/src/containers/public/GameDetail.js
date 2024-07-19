import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useResolvedPath } from 'react-router-dom'
import { useEffect } from 'react';
import icons from '../../utils/icons'
import { Loading } from '../../components';

const GameDetail = () => {
    const url = useResolvedPath().pathname
    let gameId = url.match(/\d/g);
    gameId = gameId.join('')

    const FaChevronRight = icons.FaChevronRight
    const FaChevronLeft = icons.FaChevronLeft
    const [currentImage, setCurrentImage] = useState(0)

    const allGames = useSelector(state => state.games.allGames.data)
    const outlet = document.getElementById('outlet');

    console.log(allGames, outlet)
    
    let outletWidth = 0
    if(outlet) {
        outletWidth = outlet?.clientWidth
    }
    useEffect(() => {
         outletWidth = outlet?.clientWidth 
     }) 

    let currentGame
    let images 
    let categories 
    if(allGames !== null) {
        if(allGames.length !== 0) {
            currentGame = allGames.filter((game) => game.id == gameId)
            currentGame = currentGame[0]
            images = [currentGame?.main_image]
            categories = [currentGame?.main_category]
        }
    }

    if(currentGame.images.length !== 0) images.push(...currentGame.images)
    if(currentGame.categories.length !== 0) categories.push(...currentGame.categories)

    const handlePrevImage = () => {
        if(currentImage === 0) setCurrentImage(images.length - 1)
        else setCurrentImage(prev => prev - 1)
    }
    const handleNextImage = () => {
        if(currentImage === images.length - 1) setCurrentImage(0)
            else setCurrentImage(prev => prev + 1)
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start w-full mb-[15px] border-b border-gray-400 pb-[20px]'>
                <div className='text-gray-100 text-[60px] font-bold w-full'>
                    {currentGame?.name}
                </div>
                <div className='flex mt-[3px]'>
                    {categories.map((item, index) => (
                        index == 0 ? 
                            <div className='text-[17px] text-green-400 border rounded-lg border-gray-300 py-[3px] px-[10px] bg-gray-900 mr-[15px]' key={index}>{item}</div>
                            : <div className='text-[17px] text-orange-400 border rounded-lg border-gray-300 py-[3px] px-[10px] bg-gray-900 mr-[15px]' key={index}>{item}</div>
                    ))}
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <div className={`flex text-gray-300 absolute justify-between items-center select-none w-[${outletWidth}px]`}>
                    <div 
                        className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-400 text-gray-500 hover:border-white hover:text-white cursor-pointer'
                        onClick={handlePrevImage}
                    ><FaChevronLeft size={30}/></div>
                    <div 
                        className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-400 text-gray-500 hover:border-white hover:text-white cursor-pointer'
                        onClick={handleNextImage}
                    ><FaChevronRight size={30}/></div>
                </div>
                <img className='w-full h-[530px]' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${images[currentImage]}`} alt='main-image' />
            </div>
            <div className='text-gray-100'>
                {currentGame.description}
            </div>
        </div>
    )
}

export default GameDetail