import axios from 'axios'

const API_URL = '/api/users';


// register User

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const login = async(data) => {
    const response = await axios.post(`${API_URL}/login`, data)

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const logout = async() => {
    localStorage.removeItem('user')
}
const authService = { register, login, logout }

export default authService