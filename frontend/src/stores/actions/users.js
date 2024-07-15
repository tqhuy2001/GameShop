import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const signUp = (data) => async (dispatch) => {
    try {
        const response = await apis.signUp(data)
        dispatch({
            type: actionTypes.SIGN_UP,
            success: {
                successCode: response.status,
                successDetail: response.data.detail,
            },
            error: null,
        })
    } catch (error) {
        dispatch({
            type: actionTypes.SIGN_UP,
            success: null,
            error: {
                errorCode: error.response.status,
                errorDetail: error.response.data.detail,
            },
        })
    }
}