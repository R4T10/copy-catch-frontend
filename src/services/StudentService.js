import apiClient from '@/services/AxiosClient.js'
export default {
  get_student_list(course_id) {
    return apiClient.get('/get_student_list', { params: { id: course_id } })
  }
}
