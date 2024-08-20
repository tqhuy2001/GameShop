import React from 'react'
import { PublicListGames } from '../components/searchGame/notAuth'
import { PrivateListGames } from '../components/searchGame/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../stores/actions'

const SearchGame = () => {

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.users.login.authenticated)
  const gamesBought = useSelector(state => state.users.currentUser.gamesBought)

  const data = useSelector(state => state.games.allGames.data)
  if(data === null || isLoggedIn === null || gamesBought === null) dispatch(actions.loading())
  else dispatch(actions.stopLoading())

  return (
    <div className='w-full pb-[40px]'>
      {data != null && isLoggedIn != null && gamesBought != null ?
      (isLoggedIn ? <PrivateListGames gamesBought={gamesBought} data={data} /> : <PublicListGames gamesBought={gamesBought} data={data} />) : null}
    </div>
  )
}

export default SearchGame
