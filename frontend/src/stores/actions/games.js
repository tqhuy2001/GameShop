import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getAllGames = () => async (dispatch) => {
    try {
        const response = await apis.getAllGames()
        if(response?.status === 200){
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: response?.data,
                error: null
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: null,
                error: null
            })
            console.error('Error fetching data')
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_GAMES,
            gamesData: null,
            error: {
                errorCode: error.response.status,
                errorDetail: error.response.data.detail,
            }
        })
    }
}