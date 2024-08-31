import React, { useEffect, useState } from 'react'
import { PublicListGames } from '../components/searchGame/notAuth'
import { PrivateListGames } from '../components/searchGame/auth'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'

const SearchGame = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPage, setDataPage] = useState([])

  const isLoggedIn = useSelector(state => state.users.login.authenticated)
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)
  const dataGames = useSelector(state => state.games.allGames.data)

  const handleSwitchPage = (page) => {
    setCurrentPage(page)
    setDataPage(dataGames.slice((page - 1) * 12, Math.min(page * 12, dataGames.length)))
  }

  useEffect(() => {
    if(dataGames != null) handleSwitchPage(1)
  }, [dataGames])

  const maxPages = Math.ceil(dataGames?.length / 12)

  return (
    <div className='w-full pb-[40px]'>
      {(dataGames == null || isLoggedIn == null || gamesBought == null || dataPage == [] || dataPage == undefined) ? <Loading /> :
      <div className='w-full flex flex-col items-center'>
        {isLoggedIn ? <PrivateListGames gamesBought={gamesBought} data={dataPage} /> : <PublicListGames gamesBought={gamesBought} data={dataPage} />}
        <div className='mt-[20px] flex gap-[10px]'>
        {Array.from({ length: maxPages }, (_, index) => (
          <button 
            key={index + 1} 
            className={`text-gray-300 ${currentPage === index + 1 ? 'bg-zinc-700' : 'hover:bg-zinc-700'} border border-gray-500 min-w-[25px] h-[25px] rounded-sm flex items-center justify-center text-[15px]`}
            onClick={() => handleSwitchPage(index + 1)}>
          {index + 1}
          </button>
        ))}
        </div>
      </div>}
    </div>
  )
}

export default SearchGame
