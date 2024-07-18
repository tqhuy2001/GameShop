import React from 'react'
import { PublicListGames } from '../../components/public'
import { PrivateListGames } from '../../components/private'
import { useSelector } from 'react-redux'

const SearchGame = () => {
  const isLoggedIn = useSelector(state => state.users.login.authenticated)
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)

  const state = useSelector(state => state.games.allGames)
  const data = state.data
  const error = state.error

  return (
    <div className='w-full'>
        {isLoggedIn ? <PrivateListGames gamesBought={gamesBought} data={data} error={error} /> : <PublicListGames gamesBought={gamesBought} data={data} error={error} />}
    </div>
  )
}

export default SearchGame
