import apiClient from '@/services/AxiosClient.js'
export default {
  uploadFile(file) {
    return apiClient.post('/upload', file)
  },
  reuploadFile(file) {
    return apiClient.post('/reupload', file)
  }
}
