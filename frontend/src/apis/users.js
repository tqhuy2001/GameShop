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