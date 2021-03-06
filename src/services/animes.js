import axios from 'axios'
const baseUrl = 'https://api.jikan.moe/v3/'

const getById = id => {
    try {
        const request = axios.get(`${baseUrl}anime/${id}`)
        return request.then(response => {
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

const getAllRatings = () => {
    try {
        const request = axios.get(`https://salty-fjord-05650.herokuapp.com/api/ratings`)
        return request.then(response => {
            return response.data
        })
    } catch (err) {
        console.log(err)
    }
}

const postRating = (req) => {
    try {
        const res = axios.post(`https://salty-fjord-05650.herokuapp.com/api/ratings`, req)
        return res
    } catch (err) {
        console.log(err)
    }
}

const getAllSeasonRatings = () => {
    try {
        const request = axios.get(`https://salty-fjord-05650.herokuapp.com/api/seasonRatings`)
        return request.then(response => {
            return response.data
        })
    } catch (err) {
        console.log(err)
    }
}

const postSeasonRating = (req) => {
    try {
        const res = axios.post(`https://salty-fjord-05650.herokuapp.com/api/seasonRatings`, req)
        return res
    } catch (err) {
        console.log(err)
    }
}

const exportAll = {
    getById, getTopByPages, searchByName, getAllRatings, postRating, getAllSeasonRatings, postSeasonRating
}

export default exportAll