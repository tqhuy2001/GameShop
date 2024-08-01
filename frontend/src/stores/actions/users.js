import actionTypes from "./actionTypes";
import * as apis from '../../apis'

const getInfoCurrentUser = async () => {
    let valueReturn = {}
    try {
        const response = await apis.getInfoCurrentUser()
        if(response?.status === 200){
            valueReturn = response?.data
        }
        else {
            console.error('Error fetching data')
            valueReturn = {}
        }
    } catch (error) {
        valueReturn = {}
    }
    return valueReturn
}

const getGamesBought = async () => {
    let valueReturn = []
    try {
        const response = await apis.getGamesBought()
            response?.data.map(item => (
                valueReturn = [...valueReturn, item.game_id]
            ))
    } catch (error) {
        valueReturn = []
    }
    return valueReturn
}

const getGamesLiked = async () => {
    let valueReturn = []
    try {
        const response = await apis.getGamesLiked()
            response?.data.map(item => (
                valueReturn = [...valueReturn, item.game_id]
            ))
    } catch (error) {
        valueReturn = []
    }
    return valueReturn
}

export const getExistedLogin = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    })
    if(localStorage.getItem('token') !== null) {
        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        const gamesLiked = await getGamesLiked()

        dispatch({
            type: actionTypes.LOGIN,
            authenticated: true,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            dataUser: dataUser,
            gamesBought: gamesBought,
            gamesLiked: gamesLiked,
            error: {},
        })            
    }
    else {
        dispatch({
            type: actionTypes.LOGIN,
            authenticated: false,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            dataUser: {},
            gamesBought: [],
            gamesLiked: [],
            error: {},
        })            
    }
    dispatch({
        type: actionTypes.STOP_LOADING
    })
}

export const signOut = () => (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    })
    localStorage.removeItem('token')
    dispatch({
        type: actionTypes.SIGN_OUT,
    })
    dispatch({
        type: actionTypes.STOP_LOADING
    })
}

export const login = (data) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    })
    try {
        const responseLogin = await apis.login(data)
        localStorage.setItem('token', responseLogin.data.access_token)
        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        dispatch({
            type: actionTypes.LOGIN,
            authenticated: true,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            dataUser: dataUser,
            gamesBought: gamesBought,
            error: {},
        })
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN,
            authenticated: false,
            error: {
                errorCode: error.response?.status,
                errorDetail: error.response?.data.detail,
            },
        })
    }
    dispatch({
        type: actionTypes.STOP_LOADING
    })
}