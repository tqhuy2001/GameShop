import actionTypes from "../actions/actionTypes"

const initState = {
    allGames: {
        data: [],
        error: {},
    }
}

const gamesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_GAMES:
            return {
                ...state,
                allGames: {
                    data: action.gamesData,
                    error: action.error,
                }
            }
        default:
            return state
    }
}

export default gamesReducer