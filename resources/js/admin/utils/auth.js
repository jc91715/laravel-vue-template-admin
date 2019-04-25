import Cookies from 'js-cookie'
import axios from 'axios'
const TokenKey = process.env.MIX_TOKEN_KEY

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    axios.defaults.headers.common['Authorization'] = ``
    return Cookies.remove(TokenKey)
}
