import apiClient from '@/services/AxiosClient.js'
export default {
  getAccessToken(formData) {
    return apiClient.post('/callback', formData)
  },
  //   fetchUserInfo(accessToken) {
  //     return apiClient.get('/userinfo', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //   },
  login() {
    return apiClient.get('/login')
  }
}
