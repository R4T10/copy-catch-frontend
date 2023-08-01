import apiClient from '@/services/AxiosClient.js'

export default {
  getAccessToken(formData) {
    return apiClient.post('/callback', formData).then((response) => {
      const access_token = response.data.access_token
      localStorage.setItem('access_token', access_token)
      return access_token
    })
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
