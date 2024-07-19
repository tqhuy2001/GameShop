import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getAllGames = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    })
    try {
        const response = await apis.getAllGames()
            const games = await Promise.all(
                response.data.map(async (item) => {
                    const images = await getGameImages(item.id)
                    const categories = await getGameCategories(item.id)
                    return {...item, images, categories}
            }))
            dispatch({
                type: actionTypes.GET_ALL_GAMES,
                gamesData: games,
                error: {},
            })
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
    dispatch({
        type: actionTypes.STOP_LOADING
    })
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

const getGameCategories = async (gameId) => {
    let valueReturn = []
    try {
        const response = await apis.getGameCategories(gameId)
        if(response?.status === 200){
            response?.data.map(item => (
                valueReturn = [...valueReturn, item.category]
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