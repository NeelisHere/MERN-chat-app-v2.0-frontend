import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_BASE_URL = 'http://localhost:8000/api/v2'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`
    }
})

export const registerUser = async (user) => api.post(`/users/register`, user) 

export const loginUser = async (user) => api.post(`/users/login`, user) 

// export const searchUser = async (text) => {
//     const token = JSON.parse(localStorage.getItem('userInfo'))?.token
//     const headers = {
//         Authorization: `Bearer ${token}`
//     }
//     const url = `${API_BASE_URL}/users?search=${text}`
//     return await axios.get(url, { headers })
// }

export const searchUser = async (text) => api.get(`/users?search=${text}`)

export const accessChat = async (userId) => api.post(`/chats`, { userId })

export const fetchMyChats = async () => api.get(`/chats`)

export const createGroupChat = async (data) => api.post(`/chats/group/create`, data)

export const renameGroupChat = async (data) => api.put(`/chats/group/rename-chat`, data)

export const addUserToGroup = async (data) => api.put(`/chats/group/add-user`, data)

export const removeUserFromGroup = async (data) => api.put(`/chats/group/remove-user`, data)

