import React from 'react'
import { useSelector } from 'react-redux'
import { GameCard } from './GameCard'

const ListGames = () => {

    const listGames = useSelector(state => state.app)
    const data = listGames.games

  return (
    <div className=''>
      <div className='grid grid-cols-4 gap-2 py-[10px]'>
        {data.map((item) => (
          <div key={item.id}>
            <GameCard data={item}/>
          </div>
          ))}
        </div>
    </div>
  )
}

export default ListGames
