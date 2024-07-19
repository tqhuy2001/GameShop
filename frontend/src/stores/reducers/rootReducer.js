import gamesReducer from "./gamesReducer";
import usersReducer from "./usersReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    games: gamesReducer,
    users: usersReducer,
    app: appReducer,
})

export default rootReducer