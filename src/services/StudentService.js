import apiClient from '@/services/AxiosClient.js'
export default {
  get_student_list(course_id) {
    return apiClient.get('/get_student_list', { params: { id: course_id } })
  },
  update_email(formData) {
    return apiClient.post('/update_email', formData)
  }
}
