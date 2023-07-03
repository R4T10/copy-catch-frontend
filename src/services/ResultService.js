import apiClient from '@/services/AxiosClient.js'
export default {
  tableResult(course_id) {
    return apiClient.get('/comparing_student', { params: { id: course_id } })
  },
  google_tableResult(course_id) {
    return apiClient.get('/search_google', course_id)
  }
}
