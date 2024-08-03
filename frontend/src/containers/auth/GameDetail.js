import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import { useResolvedPath } from 'react-router-dom'
import { useEffect } from 'react';
import icons from '../../utils/icons'
import * as apis from '../../apis'
import { Loading } from '../../components';

const GameDetail = () => {
    const url = useResolvedPath().pathname
    let gameId = url.match(/\d/g);
    gameId = gameId.join('')

    const BiLike = icons.BiLike
    const FaChevronRight = icons.FaChevronRight
    const FaChevronLeft = icons.FaChevronLeft
    const [currentImage, setCurrentImage] = useState(0)
    const [outletWidth, setOutletWidth] = useState(0)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])

    const [selectionActive, setSelectionActive] = useState({
        download: false,
        comments: false,
        detail: false,
    })

    const allGames = useSelector(state => state.games.allGames.data)
    const currentUser = useSelector(state => state.users.currentUser)
    const gamesLiked = currentUser?.gamesLiked
    const outlet = document.getElementById('outlet')
    
    let currentGame
    let images
    let categories

    useEffect(() => {
        if(outlet !== null && outletWidth == 0) {
            setOutletWidth(outlet.clientWidth)
        }
        
        function updateSize() {
            if(outlet !== null) {
                setOutletWidth(outlet.clientWidth)
            }
        }
        window.addEventListener("resize", updateSize)
    })

    useEffect(() => {
        if(gamesLiked !== null) setLiked(gamesLiked?.includes(Number(gameId)))
    }, [])

    useEffect(() => {
        const getComments = async (gameId) => {
            try {
                const response = await apis.getComments(gameId)
                setComments(response?.data)
            } catch (error) {
                
            }
        }

        getComments(Number(gameId))
    }, [])

    if(allGames !== null) {
        if(allGames.length !== 0) {
            currentGame = allGames.filter((game) => game.id == gameId)
            currentGame = currentGame[0]
            images = [currentGame?.main_image]
            categories = [currentGame?.main_category]
        }
        if(currentGame.images.length !== 0) images.push(...currentGame.images)
        if(currentGame.categories.length !== 0) categories.push(...currentGame.categories)
    }

    const handlePrevImage = () => {
        if(currentImage === 0) setCurrentImage(images.length - 1)
        else setCurrentImage(prev => prev - 1)
    }
    const handleNextImage = () => {
        if(currentImage === images.length - 1) setCurrentImage(0)
            else setCurrentImage(prev => prev + 1)
    }

    const handleClickDowload = () => {
        setSelectionActive({
            download: true,
            comments: false,
            detail: false,
        })
    }
    const handleClickComments = () => {
        setSelectionActive({
            download: false,
            comments: true,
            detail: false,
        })
    }
    const handleClickDetail = () => {
        setSelectionActive({
            download: false,
            comments: false,
            detail: true,
        })
    }
    const handleClickLike = async () => {
        setLiked(!liked)
        await apis.likeGame(gameId)
    }

    const handlePostComment = async () => {
        const text = document.getElementById('commentText')
        const addComment = async (gameId, content) => {
            try {
                await apis.addComment(gameId, content)
            } catch (error) {}
        }
        const data = {content: text?.value} 
        await addComment(Number(gameId), data)
        try {
            const response = await apis.getComments(gameId)
            setComments(response?.data)
            console.log(response)
        } catch (error) {}
        text.value = ''
    }
    
    return (
        <div className='flex flex-col w-full'>
            {allGames === null || outlet === null ? <Loading /> : 
            <div className='w-full'>
                <div className='flex flex-col items-start w-full mb-[15px] border-b border-gray-400 pb-[10px]'>
                    <div className='text-gray-100 text-[60px] font-bold w-full'>
                        {currentGame?.name}
                    </div>
                    <div className='flex mt-[3px] items-end justify-between w-full'>
                        <div className='flex'>
                            {categories.map((item, index) => (
                                <div 
                                    className={`cursor-pointer text-[17px] ${index == 0 ? 'text-green-500' : 'text-orange-400'} border rounded-lg border-gray-300 py-[3px] px-[10px] bg-gray-900 mr-[15px]`}
                                    key={index}
                                >{item}</div>
                            ))}
                        </div>
                        <div className='flex'>
                            <div className='flex'>
                                <div className='text-gray-500'>By</div>
                                <div className='text-orange-500 ml-[5px]'>{currentGame.user_created_name}</div>
                            </div>
                            <div className='text-gray-500 mx-[5px]'>--</div>
                            <div className='text-gray-500'>At {currentGame.create_at.slice(0, 10)}</div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center relative'>
                    <div className='flex absolute justify-between items-center select-none w-full'>
                        <div 
                            className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-400 text-gray-400 hover:border-white hover:text-white cursor-pointer'
                            onClick={handlePrevImage}
                        ><FaChevronLeft size={30}/></div>
                        <div 
                            className='flex items-center rounded-lg justify-center h-[100px] w-[40px] border-[2px] border-gray-400 text-gray-400 hover:border-white hover:text-white cursor-pointer'
                            onClick={handleNextImage}
                        ><FaChevronRight size={30}/></div>
                    </div>
                    <img className='w-full h-[530px]' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${images[currentImage]}`} alt='main-image' />
                </div>
                <div className='text-gray-300 mt-[20px] text-[20px]'>
                    {currentGame.description}
                </div>
                <div className='flex mt-[20px] border-t border-b text-gray-300 border-gray-300 h-[45px] gap-[20px] font-bold select-none py-[3px]'>
                    <div 
                        className={`rounded-md justify-center w-[130px] flex items-center cursor-pointer hover:bg-zinc-500 hover:bg-opacity-50 ${liked ? 'text-blue-400' : null}`}
                        onClick={handleClickLike}
                    >
                        <div className='flex mr-[2px]'><BiLike /></div>
                        Like
                    </div>
                    <div className={`rounded-md justify-center w-[130px] px-[5px] flex items-center cursor-pointer ${selectionActive.download ? 'bg-gray-400 text-slate-800' : 'hover:bg-zinc-500 hover:bg-opacity-50'}`}
                        onClick={handleClickDowload}>
                        Buy
                    </div>
                    <div className={`rounded-md justify-center w-[130px] px-[5px] flex items-center cursor-pointer ${selectionActive.comments ? 'bg-gray-400 text-slate-800' : 'hover:bg-zinc-500 hover:bg-opacity-50'}`}
                        onClick={handleClickComments}>
                        Comments{`(${comments.length})`}
                    </div>
                    <div className={`rounded-md justify-center w-[130px] px-[5px] flex items-center cursor-pointer ${selectionActive.detail ? 'bg-gray-400 text-slate-800' : 'hover:bg-zinc-500 hover:bg-opacity-50'}`}
                        onClick={handleClickDetail}>
                        Detail
                    </div>
                </div>
                <div className='text-gray-300 border-b border-gray-300'>
                    <div className={`w-full flex flex-col ${selectionActive.comments ? 'block' : 'hidden'} py-[10px] gap-[5px]`}>
                        <div className='w-full flex flex-col bg-zinc-900 px-[10px] py-[5px] pb-[10px] rounded-lg h-auto'>
                            <div className='flex items-center mb-[10px]'>
                                <img 
                                    src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${currentUser.dataUser.avatar}`} 
                                    className='w-[45px] h-[45px] rounded-full mr-[10px]'/>
                                <div className='text-green-500 text-[18px]'>{currentUser.dataUser.username}</div>
                            </div>
                            <textarea
                                id='commentText'
                                type='text'
                                className='w-full mb-[10px] h-[100px] bg-zinc-900 border border-gray-600 rounded-lg outline-none px-[10px] py-[4px] placeholder-gray-600'
                                placeholder='Write comment...'/>
                            <div className='w-full flex justify-end pr-[5px]'>
                                <button 
                                    className='w-[80px] h-[30px] bg-red-700 flex items-center justify-center rounded-xl font-semibold text-gray-300 hover:bg-red-600'
                                    onClick={handlePostComment}>
                                        Post</button>
                            </div>
                        </div>
                        <div className='text-[20px] ml-[5px]'>Comments</div>
                        {comments.map(item => (
                            <div key={item.GameComments.id} 
                                className='w-full flex flex-col bg-zinc-900 px-[10px] py-[5px] rounded-lg'>
                                    <div className='flex mb-[3px] justify-between'>
                                        <div className='flex items-center'>
                                            <img 
                                                src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${item.user_avatar}`} 
                                                className='w-[45px] h-[45px] rounded-full mr-[10px]'/>
                                            <div className='flex flex-col justify-center'>
                                                <div className='text-green-500 text-[18px]'>{item.user_username}</div>
                                                <div className={`text-[14px] ${item.user_permission == 'Admin' ? 'text-red-500' : (item.user_permission == 'Staff' ? 'text-yellow-500' : 'text-gray-500')}`}>
                                                    {item.user_permission}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-[14px] text-gray-500'>{item.GameComments.comment_at.replace('T', ' ')}</div>
                                    </div>
                                    <div className='text-gray-300'>{item.GameComments.content}</div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default GameDetail