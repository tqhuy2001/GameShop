import React from 'react'
import { useSelector } from 'react-redux'

const ListGames = () => {

    const listGames = useSelector(state => state.app)
    const data = listGames.games

  return (
    <div className=''>
      ListGames
      <div className='grid grid-cols-4 gap-3 my-[10px]'>
        {data.map((item, index) => (
          <div key={index} className='rounded-lg bg-white w-full h-[350px]'>
  
                <img className='rounded-lg w-full h-full' src={`${process.env.REACT_APP_GET_IMAGE}${item.main_image}`}/>
                <div className='relative bottom-[20px]'>asdfasdfas</div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default ListGames
