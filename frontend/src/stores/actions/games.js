import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getAllGames = () => async (dispatch) => {
    try {
        const response = await apis.getAllGames()
        if(response?.status === 200){
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: response.data
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_GAMES,
            gamesData: null
        })
    }
}