
import actionTypes from "../actions/actionTypes"

const initState = {
    games: {
        allGames: {
            data: [],
            error: {},
        }
    },
    users: {
        signUp: {
            success: {},
            error: {},
        }
    }
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_GAMES:
            return {
                ...state,
                games: {
                    ...state.games,
                    allGames: {
                        data: action.gamesData,
                        error: action.error,
                    }
                }
            }
        case actionTypes.SIGN_UP:
            return {
                ...state,
                users: {
                    ...state.users,
                    signUp: {
                        success: action.success,
                        error: action.error,
                    }
                }
            }
            
        default:
            return state
    }
}

export default appReducer