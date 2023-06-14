import apiClient from '@/services/AxiosClient.js'
export default {
  tableResult() {
    return apiClient.get('/get_data')
  }
}
