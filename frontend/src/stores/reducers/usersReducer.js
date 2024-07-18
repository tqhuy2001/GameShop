import actionTypes from "../actions/actionTypes"

const initState = {
    login: {
        authenticated: null,
        error: null,
    },
    currentUser: {
        dataUser: null,
        gamesBought: null,
        error: null,
    },
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                login: {
                    authenticated: action.authenticated,
                    error: action.error,
                }
            }
        case actionTypes.GET_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    dataUser: action.dataUser,
                    gamesBought: action.gamesBought,
                    error: action.error,
                }
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                login: {
                    authenticated: false,
                    error: {},
                },
                currentUser: {
                    dataUser: {},
                    gamesBought: [],
                    error: {},
                }
            }
        default:
            return state
    }
}

export default usersReducer