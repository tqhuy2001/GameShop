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
                valueReturn = [...valueReturn, {game_id: item.game_id, name: item.name, download_link: item.download_link, bought_at: item.bought_at}]
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
    if(localStorage.getItem('token')) sessionStorage.setItem('token', localStorage.getItem('token'))

    if(sessionStorage.getItem('token')) {
        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        const gamesLiked = await getGamesLiked()
        const token = sessionStorage.getItem('token')
        const wsUser = new WebSocket(`ws://localhost:8001/contact-chat/${token}`)

        dispatch({
            type: actionTypes.LOGIN,
            authenticated: true,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            wsUser: wsUser,
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
    if(localStorage.getItem('token')) localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    dispatch({
        type: actionTypes.SIGN_OUT,
    })
    dispatch({
        type: actionTypes.STOP_LOADING
    })
}

export const login = (data, isRemembered) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING
    })
    try {
        const responseLogin = await apis.login(data)

        if(isRemembered) {
            localStorage.setItem('token', responseLogin.data.access_token)
            sessionStorage.setItem('token', responseLogin.data.access_token)
        }
        else sessionStorage.setItem('token', responseLogin.data.access_token)

        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        const token = sessionStorage.getItem('token')
        const wsUser = new WebSocket(`ws://localhost:8001/contact-chat/${token}`)

        dispatch({
            type: actionTypes.LOGIN,
            authenticated: true,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            wsUser: wsUser,
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