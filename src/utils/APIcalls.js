import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_BASE_URL = 'http://localhost:8000/api/v2'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
    }
})

export const registerUser = async (user) => api.post(`/users/register`, user) 

export const loginUser = async (user) => api.post(`/users/login`, user) 