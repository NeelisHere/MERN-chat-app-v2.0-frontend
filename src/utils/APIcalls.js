import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v2`
// const API_BASE_URL = 'http://localhost:8000/api/v2'

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
export const searchUser = async (text) => api.get(`/users?search=${text}`)
export const updateMyProfileAPI = async (userId, data) => api.put(`/users/${userId}`, data)
export const getUserProfileAPI = async (userId) => api.put(`/users/${userId}`)

export const accessChat = async (userId) => api.post(`/chats`, { userId })
export const fetchMyChats = async () => api.get(`/chats`)
export const createGroupChat = async (data) => api.post(`/chats/group/create`, data)
export const renameGroupChat = async (data) => api.put(`/chats/group/rename-chat`, data)
export const addUserToGroup = async (data) => api.put(`/chats/group/add-user`, data)
export const removeUserFromGroup = async (data) => api.put(`/chats/group/remove-user`, data)
export const updateGroupPhotoAPI = async (data) => api.put(`/chats/group/edit-photo`, data)

export const fetchMessagesAPI = async (chatId) => api.get(`/messages/${chatId}`)
export const sendMessageAPI = async (data) => api.post(`/messages/`, data)
export const editMessageAPI = async (data) => api.put(`/messages/edit`, data)
export const deleteMessageAPI = async (data) => api.put(`/messages/delete`, data)

