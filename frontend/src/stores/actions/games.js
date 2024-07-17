import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getAllGames = () => async (dispatch) => {
    try {
        const response = await apis.getAllGames()
        if(response.status === 200){
            const gameWithImages = await Promise.all(
                response.data.map(async (item) => {
                    const images = await getGameImages(item.id)
                    return {...item, images}
            }))
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: gameWithImages,
                error: {},
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: [],
                error: {}
            })
            console.error('Error fetching data')
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_GAMES,
            gamesData: [],
            error: {
                errorCode: error.response.status,
                errorDetail: error.response.data.detail,
            }
        })
    }
}

const getGameImages = async (gameId) => {
    let valueReturn = []
    try {
        const response = await apis.getGameImages(gameId)
        if(response?.status === 200){
            response?.data.map(item => (
                valueReturn = [...valueReturn, item.image]
            ))
        }
        else {
            console.error('Error fetching data')
            valueReturn = []
        }
    } catch (error) {
        valueReturn = []
    }
    return valueReturn
}