import axios from 'axios'

export const getSender = (users, loggedInUser) => {
    return users[0]._id === loggedInUser._id ? users[1] : users[0]
}

export const getImageURL = async (file) => {
    const uploadPreset = 'skf6pzxs'
    const cloudName = 'npaul-703'
    const fomrData = new FormData()
    fomrData.append('file', file)
    fomrData.append('upload_preset', uploadPreset)
    fomrData.append('cloud_name', cloudName)
    const url = 'https://api.cloudinary.com/v1_1/npaul-703/image/upload'
    const { data } = await axios.post(url, fomrData)
    return data
} 