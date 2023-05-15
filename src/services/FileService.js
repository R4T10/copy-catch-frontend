import apiClient from '@/services/AxiosClient.js'
export default {
  uploadFile(file) {
    return apiClient
      .post('/upload', file)
      .then((response) => {
        // Handle success response if needed
        console.log(response.data)
      })
      .catch((error) => {
        // Handle error response if needed
        console.error('File upload failed:', error)
      })
  }
}
