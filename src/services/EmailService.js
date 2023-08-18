import apiClient from '@/services/AxiosClient.js'
export default {
  send_email(formData) {
    return apiClient.post('/send_email', formData)
  }
}
