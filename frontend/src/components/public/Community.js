import React, { useEffect, useState } from 'react'
import * as apis from '../../apis'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Community = () => {
  const [comments, setComments] = useState([])
  const allGames = useSelector(state => state.games.allGames.data)
  const navigate = useNavigate()

  const getComments = async () => {
    try {
      const response = await apis.getAllComments()
      setComments(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getComments()
    const interval = setInterval(() => getComments(), 10000 * 6)
    return () => clearInterval(interval)
  }, [])

  const handleClickGameName = (gameId) => {
    navigate(`/search-game/${gameId}`)
  }

  return (
    <div className='flex flex-col items-center rounded-lg border border-gray-500 w-[250px] h-[600px] pb-[7px] text-gray-300 select-none bg-zinc-900'>
      <div className='text-[22px] font-semibold'>Community</div>
      <div className='flex flex-col mt-[2px] w-full h-full gap-[7px]'>
        {comments?.map((item) => (
          <div key={item.GameComments.id} className='w-full bg-opacity-50 bg-zinc-700 h-1/6 px-[2px]'>
            <div className='flex text-[15px] py-[1px] px-[2px] items-center'>
              <img className='w-[35px] h-[35px] rounded-full' src={item.user_avatar}/>
              <div className='w-full ml-[5px] flex flex-col'>
                <div className='flex'>
                  <span
                    className={`mr-[3px] ${item.user_permission === 'Customer' ? 'text-green-500' : (item.user_permission === 'Admin' ? 'text-red-500' : 'text-yellow-500')}`}
                  >{item.user_username}</span>
                  comments in
                </div>
                {allGames?.map(itemGame => {
                  if(itemGame.id == item.GameComments.game_id) return (
                    <span 
                      key={itemGame.id}
                      className='ml-[3px] text-orange-400 hover:underline hover:cursor-pointer truncate'
                      onClick={() => handleClickGameName(item.GameComments.game_id)}
                    >{itemGame.name}</span>
                  )
                })}
              </div>
            </div>
            <div className='ml-[3px] text-[15px] text-gray-400 truncate w-full'>{item.GameComments.content}</div>
            <div className='text-[10px] italic ml-[3px] text-gray-500'>{item.GameComments.comment_at.replace('T', ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
