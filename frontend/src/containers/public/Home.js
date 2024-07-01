import React, { useEffect } from 'react'
import ListGames from '../../components/ListGames'
import * as actions from '../../stores/actions'
import { useDispatch } from 'react-redux'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllGames())
  }, [])

  return (
    <div className=''>
      <ListGames />
    </div>
  )
}

export default Home
