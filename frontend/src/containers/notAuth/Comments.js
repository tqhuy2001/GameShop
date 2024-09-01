import React, { useState, useEffect } from 'react'

export const Comments = ({ comments }) => {
    const [commentsAmount, setCommentsAmount] = useState(0)

    const handleMoreComments = () => {
        if(commentsAmount + 5 > comments.length) setCommentsAmount(comments.length)
        else setCommentsAmount(commentsAmount + 5)
    }

    return (
        <div className={`w-full flex flex-col py-[10px] gap-[5px]`}>
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
                            <div className='text-gray-300'>{item.GameComments.content}</div>
                    </div>
                ))}
                <div className={`flex w-full justify-center mt-[5px] hover:underline hover:cursor-pointer select-none ${commentsAmount == comments.length ? 'hidden' : 'block'}`} onClick={handleMoreComments}>More comments...</div>
        </div>
  )
}
