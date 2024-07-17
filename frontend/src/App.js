import { Home, Login, Public, SignUp, SearchGame, GameDetail } from './containers/public/'
import { Routes, Route } from "react-router-dom";
import * as actions from './stores/actions'
import path from "./utils/path";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllGames())
    dispatch(actions.getExistedLogin())
  }, [])

  function handleData() {
    dispatch(actions.getAllGames())
  }
  useEffect(() => {
    setInterval(handleData, 1000 * 10)
  }, [])
  
  return (
    <div className=''>
      <Routes>
        <Route path={path.public} element={<Public />}>
          <Route path={path.log_in} element={<Login />} />
          <Route path={path.sign_up} element={<SignUp />} />
          <Route path={path.search_game} element={<SearchGame />} />
          <Route path={path.home} element={<Home />} />
          <Route path={path.game_detail} element={<GameDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
