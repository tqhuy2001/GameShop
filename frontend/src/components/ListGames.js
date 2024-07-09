import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { GameCard } from './GameCard'

const ListGames = () => {
  const listGames = useSelector(state => state.app)
  const data = listGames.games

  const [widthwindow, setWidthWindow] = useState(window.innerWidth)
  useEffect(() => {
    function updateSize() {
      setWidthWindow(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
  })

  let gridItem

  if(widthwindow >= 1200) gridItem = 'grid grid-cols-4 gap-2 py-[10px]'
  else if(widthwindow >= 1025) gridItem = 'grid grid-cols-3 gap-2 py-[10px]'
  else if(widthwindow >= 775)gridItem = 'grid grid-cols-2 gap-2 py-[10px]'
  else gridItem = 'grid grid-cols-1 gap-2 py-[10px]'

  

  return (
    <div className=''>
      <div className={gridItem}>
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
