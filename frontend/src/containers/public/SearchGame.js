import React from 'react'
import { PublicListGames } from '../../components/public'
import { PrivateListGames } from '../../components/private'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../stores/actions'

const SearchGame = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.users.login.authenticated)
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)

  const state = useSelector(state => state.games.allGames)
  const data = state.data
  const error = state.error

  if(data === null || isLoggedIn === null || gamesBought === null) dispatch(actions.loading())

  return (
    <div className='w-full'>
      {isLoggedIn ? <PrivateListGames gamesBought={gamesBought} data={data} error={error} /> : <PublicListGames gamesBought={gamesBought} data={data} error={error} />}
    </div>
  )
}

export default SearchGame
