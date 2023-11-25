const axios = require('axios')

class Client {

    constructor ({ token } = {}) {

        this.token = token || process.env.COC_API_KEY
    }

    getClan(tag) {

        return axios.get(`https://api.clashofclans.com/v1/clans/${tag}`, {

        headers: {
    
            Accept: 'application/json',
            authorization: `Bearer ${this.token}`

        }})
    }

    getPlayer(tag) {

        return axios.get(`https://api.clashofclans.com/v1/players/${tag}`, {

        headers: {
    
            Accept: 'application/json',
            authorization: `Bearer ${this.token}`

        }})
    }

    getRankByCountry(id = 32000221, limit = 3) {

        return axios.get(`https://api.clashofclans.com/v1/locations/${id}/rankings/clans?limit=${limit}`, {

        headers: {
    
            Accept: 'application/json',
            authorization: `Bearer ${this.token}`

        }})
    }
}

module.exports = { Client }