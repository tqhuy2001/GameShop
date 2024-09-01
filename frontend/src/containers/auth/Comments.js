import React, { useEffect, useState } from 'react'
import * as apis from '../../apis'

export const Comments = ({ comments, currentUser, gameId, getComments }) => {
    const [commentsAmount, setCommentsAmount] = useState(0)
    const [outletWidth, setOutletWidth] = useState(0)
    const handlePostComment = async () => {
        const text = document.getElementById('commentText')
        const addComment = async (gameId, content) => {
            try {
                await apis.addComment(gameId, content)
            } catch (error) {}
        }
        const data = {content: text?.value}
        await addComment(Number(gameId), data)
        getComments(gameId)
        text.value = ''
    }

    const handleMoreComments = () => {
        if(commentsAmount + 5 > comments.length) setCommentsAmount(comments.length)
        else setCommentsAmount(commentsAmount + 5)
    }

    const outlet = document.getElementById('outlet')
    useEffect(() => {
        setOutletWidth(outlet?.clientWidth)
    }, [outlet?.clientWidth])

    return (
        <div className={`w-full flex flex-col py-[10px] gap-[5px] max-w-[${outletWidth}px]`}>
            <div className='w-full flex flex-col bg-zinc-900 px-[10px] py-[5px] pb-[10px] rounded-lg h-auto'>
                <div className='flex items-center mb-[10px]'>
                    <img 
                        src={currentUser.dataUser.avatar} 
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
                {comments.length === 0 ? (<div className='w-full flex justify-center italic text-gray-500'>Not have any comments</div>) : null}
                {comments.map((item, index) => (index >= commentsAmount ? null : 
                    <div key={item.GameComments.id} 
                        className='w-full flex flex-col bg-zinc-900 px-[10px] py-[5px] rounded-lg'>
                            <div className='flex mb-[3px] justify-between'>
                                <div className='flex items-center'>
                                    <img 
                                        src={item.user_avatar} 
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
                            <div className={`text-gray-300 break-words w-full`}>{item.GameComments.content}</div>
                    </div>
                ))}
                <div className={`flex w-full justify-center mt-[5px] hover:underline hover:cursor-pointer select-none ${commentsAmount == comments.length ? 'hidden' : 'block'}`} onClick={handleMoreComments}>More comments...</div>
        </div>
  )
}
