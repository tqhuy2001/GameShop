import React from 'react'
import { useEffect, useState } from 'react'
import { default as GameCard } from '../GameCard'

const ListGames = (props) => {
  const data = props.data
  const gamesBought = props.gamesBought
  
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
    <div className='w-full'>
      {data?.length === 0
        ? (
          <div className='text-slate-300'>
            <div>Not found any games</div>
          </div>)
        : (
          <div className={gridItem}>
            {data?.map((item) => (
              <div key={item.id}>
                {gamesBought.includes(item.id) ? <GameCard data={item} bought={true}/> : <GameCard data={item} bought={false}/>}
              </div>))}
          </div>)
      }
    </div>
  )
}

export default ListGames
