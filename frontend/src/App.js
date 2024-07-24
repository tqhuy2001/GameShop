import { Home, Login, Public, SignUp, SearchGame, GameDetail, Contact } from './containers/public/'
import { Routes, Route } from "react-router-dom";
import * as actions from './stores/actions'
import path from "./utils/path";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from './components';

function App() {
  
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)

  useEffect(() => {
    dispatch(actions.getAllGames())
    dispatch(actions.getExistedLogin())
  }, [])

  useEffect(() => {
    function handleData() {
      dispatch(actions.getAllGames())
    }
    setInterval(handleData, 1000 * 60 * 10)
  }, [])

  return (
    <div className='bg-zinc-950 min-h-screen w-screen'>
      {loading ? <Loading/> :
      <Routes>
        <Route path={path.public} element={<Public />}>
          <Route path={path.log_in} element={<Login />} />
          <Route path={path.sign_up} element={<SignUp />} />
          <Route path={path.search_game} element={<SearchGame />} />
          <Route path={path.home} element={<Home />} />
          <Route path={path.game_detail} element={<GameDetail />} />
          <Route path={path.contact} element={<Contact />} />
        </Route>
      </Routes>}
    </div>
  );
}

export default App;