import actionTypes from "./actionTypes";

export const loading = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
    })
}

export const stopLoading = () => async (dispatch) => {
    dispatch({
        type: actionTypes.STOP_LOADING,
    })
}
