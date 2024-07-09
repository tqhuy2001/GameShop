import { Home, Login, Public, SignUp, SearchGame } from './containers/public/'
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";

function App() {

  return (
    <div className=''>
      <Routes>
        <Route path={path.public} element={<Public />}>
          <Route path={path.home} element={<Home />} />
          <Route path={path.log_in} element={<Login />} />
          <Route path={path.sign_up} element={<SignUp />} />
          <Route path={path.search_game} element={<SearchGame />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
