import gamesReducer from "./gamesReducer";
import usersReducer from "./usersReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    games: gamesReducer,
    users: usersReducer,
})

export default rootReducer