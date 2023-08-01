import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})

export default apiClient
