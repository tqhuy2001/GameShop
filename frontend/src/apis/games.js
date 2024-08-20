import axios from '../axios'

export const getAllGames = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/game/get-all-games',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getGameImages = (gameId) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: `/game/get-images/${gameId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getGameCategories = (gameId) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: `/game/get-categories-id/${gameId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const likeGame = (gameId) => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: `/game/like/${gameId}`,
            method: 'options',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: ''
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const addComment = (gameId, content) => new Promise( async (resolve, reject) => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await axios({
            url: `/game_comments/add-comments/${gameId}`,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: content
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getComments = (gameId) => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: `/game_comments/get-comments/${gameId}`,
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getAllComments = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: `/game_comments/get-all-comments`,
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})