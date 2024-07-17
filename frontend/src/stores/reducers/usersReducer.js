import actionTypes from "../actions/actionTypes"

const initState = {
    login: {
        success: false,
        error: {},
    },
    currentUser: {
        dataUser: {},
        gamesBought: [],
        error: {},
    },
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                login: {
                    success: action.success,
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
                    success: false,
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