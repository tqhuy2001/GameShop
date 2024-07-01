import rootReducer from "./stores/reducers/rootReducer";
import { createStore } from 'redux'
import { thunk } from "redux-thunk";
import { applyMiddleware } from "redux";

const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}

export default reduxConfig