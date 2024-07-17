import React from 'react'
import { PublicListGames } from '../../components/public'
import { PrivateListGames } from '../../components/private'
import { useSelector } from 'react-redux'

const SearchGame = () => {
  const isLoggedIn = useSelector(state => state.users.login.success)

  return (
    <div className='w-full'>
        {isLoggedIn ? <PrivateListGames /> : <PublicListGames />}
    </div>
  )
}

export default SearchGame
