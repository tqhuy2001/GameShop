import axios from '../axios'

export const getAllGames = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/game/games',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})