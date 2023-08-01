import apiClient from '@/services/AxiosClient.js'

export default {
  add_course(formData) {
    return apiClient.post('/adding_course', formData)
  },
  delete_course(course_id) {
    return apiClient.post('/delete_course', course_id)
  },
  edit_course(formData) {
    return apiClient.post('/edit_course', formData)
  },
  get_course(formData) {
    const access_token = localStorage.getItem('access_token')

    return apiClient.post('/get_course_list', formData, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  }
}
