import React from 'react'
import { PublicListGames } from '../../components/searchGame/notAuth'
import { PrivateListGames } from '../../components/searchGame/auth'
import { useSelector } from 'react-redux'
import { Loading } from '../../components'

const SearchGame = () => {

  const isLoggedIn = useSelector(state => state.users.login.authenticated)
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)

  const data = useSelector(state => state.games.allGames.data)
  
  return (
    <div className='w-full pb-[40px]'>
      {data === null || isLoggedIn === null || gamesBought === null ? <Loading /> :
      (isLoggedIn ? <PrivateListGames gamesBought={gamesBought} data={data} /> : <PublicListGames gamesBought={gamesBought} data={data} />)}
    </div>
  )
}

export default SearchGame
