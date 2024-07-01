import React from 'react'
import { useSelector } from 'react-redux'

const ListGames = () => {

    const listGames = useSelector(state => state.app)
    const data = listGames.games

  return (
    <div>
      List Games
      {data.map((item, index) => (
        <div key={index}>
            {item.name}
        </div>
      ))}
    </div>
  )
}

export default ListGames
