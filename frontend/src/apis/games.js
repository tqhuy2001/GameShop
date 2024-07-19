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