import React, { useEffect } from 'react'
import ListGames from '../../components/ListGames'
import * as actions from '../../stores/actions'
import { useDispatch } from 'react-redux'
import Banner from '../../components/Banner'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllGames())
  }, [])

  return (
    <div className='w-full'>
      home
      <Banner />
      <ListGames />
    </div>
  )
}

export default Home
