import axios from '../axios'

export const signUp = () => new Promise( async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/customer/add',
            method: 'post',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})