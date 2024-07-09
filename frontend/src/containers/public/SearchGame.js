import React from 'react'
import ListGames from '../../components/ListGames'
import * as actions from '../../stores/actions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const SearchGame = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getAllGames())
    }, [])
  return (
    <div className='w-full'>
        <ListGames />
    </div>
  )
}

export default SearchGame
