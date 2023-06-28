import apiClient from '@/services/AxiosClient.js'
export default {
  tableResult() {
    return apiClient.get('/comparing_student')
  },
  google_tableResult() {
    return apiClient.get('/search_google')
  }
}
