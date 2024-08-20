import { PublicGameDetail } from './containers/notAuth'
import { Contact, Home, Login, Public, SignUp, SearchGame } from './containers'
import { PrivateGameDetail } from './containers/auth'
import { Routes, Route } from "react-router-dom";
import * as actions from './stores/actions'
import path from "./utils/path";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from './components';

function App() {
  
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)
  const authenticated = useSelector(state => state.users.login.authenticated)

  useEffect(() => {
    dispatch(actions.getAllGames())
    dispatch(actions.getExistedLogin())
  }, [])

  useEffect(() => {
    function handleData() {
      dispatch(actions.getAllGames())
    }
    handleData()
  }, [])
  
  return (
    <div className='bg-zinc-950 min-h-screen'>
      {loading ? <Loading/> : null}
      <Routes>
        <Route path={path.public} element={<Public />}>
          <Route path={path.log_in} element={<Login />} />
          <Route path={path.sign_up} element={<SignUp />} />
          <Route path={path.search_game} element={<SearchGame />} />
          <Route path={path.home} element={<Home />} />
          <Route path={path.game_detail} element={authenticated ? <PrivateGameDetail /> : <PublicGameDetail />} />
          <Route path={path.contact} element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;