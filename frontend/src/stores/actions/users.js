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
        if(response?.status === 200){
            response?.data.map(item => (
                valueReturn = [...valueReturn, item.game_id]
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

export const getExistedLogin = () => async (dispatch) => {
    if(localStorage.getItem('token') !== null) {
        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        dispatch({
            type: actionTypes.LOGIN,
            success: true,
            error: {},
        })
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            dataUser: dataUser,
            gamesBought: gamesBought,
            error: {},
        })            
    }
}

export const signOut = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch({
        type: actionTypes.SIGN_OUT,
    })
}

export const login = (data) => async (dispatch) => {
    try {
        const responseLogin = await apis.login(data)
        localStorage.setItem('token', responseLogin.data.access_token)
        const dataUser = await getInfoCurrentUser()
        const gamesBought = await getGamesBought()
        dispatch({
            type: actionTypes.LOGIN,
            success: true,
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
            success: false,
            error: {
                errorCode: error.response?.status,
                errorDetail: error.response?.data.detail,
            },
        })
    }
}