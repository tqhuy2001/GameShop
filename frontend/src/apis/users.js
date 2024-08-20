import axios from '../axios'

export const signUp = (data) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/customer/add',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: data,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const login = (data) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/login',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getInfoCurrentUser = () => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: '/user/get-info',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getGamesBought = () => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: '/customer/get-games-bought',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getGamesLiked = () => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: '/user/get-games-liked',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const buyGame = (gameId) => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: `/customer/add-buying/${gameId}`,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})