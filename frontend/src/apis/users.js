import axios from '../axios'

export const getUserByID = (id) => new Promise( async (resolve, reject) => {
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