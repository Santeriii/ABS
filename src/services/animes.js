import axios from 'axios'
const baseUrl = 'https://api.jikan.moe/v3/'

const getById = id => {
    try {
        const request = axios.get(`${baseUrl}anime/${id}`)
        return request.then(response => {
            console.log(response.data)
            return response.data
        })
    } catch (err) {
        console.log(err)
    }
}

const getTopByPages = pages => {
    try {
        const request = axios.get(`${baseUrl}top/anime/${pages}`)
        return request.then(response => {
            console.log(response.data)
            return response.data
        })
    } catch (err) {
        console.log(err)
    }
}

const searchByName = name => {
    try {
        const request = axios.get(`${baseUrl}search/anime?q=${name}&page=1`)
        return request.then(response => {
            console.log(response.data)
            return response.data
        })
    } catch (err) {
        console.log(err)
    }
}

const exportAll = {
    getById, getTopByPages, searchByName
}

export default exportAll