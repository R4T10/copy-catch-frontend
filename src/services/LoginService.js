import apiClient from '@/services/AxiosClient.js'

export default {
  getAccessToken(formData) {
    return apiClient.post('/callback', formData)
  },
  getStoredAccessToken() {
    return localStorage.getItem('access_token')
  },

  clearAccessToken() {
    return localStorage.removeItem('access_token')
  },
  fetchUserInfo(accessToken) {
    return apiClient.get('/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  login() {
    return apiClient.get('/login')
  }
}
