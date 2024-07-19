import actionTypes from "../actions/actionTypes"

const initState = {
    loading: true,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.STOP_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default appReducer