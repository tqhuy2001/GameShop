import actionTypes from "../actions/actionTypes"

const initState = {
    games: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_GAMES:
            return {
                ...state,
                games: action.gamesData
            }
            
        default:
            return state
    }
}

export default appReducer