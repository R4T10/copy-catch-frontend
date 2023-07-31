<template>
  <div v-if="GStore.course">
    <div class="home">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Enter search query"
      />
      <button @click="showForm">Adding Course</button>
    </div>
    <CourseBlog
      v-for="detail in filteredData"
      :key="detail.id"
      :detail="detail"
    >
    </CourseBlog>
    <h2>User Information:</h2>
    <pre>{{ GStore.user }}</pre>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import CourseService from '@/services/CourseService'
import CourseBlog from '@/components/CourseBlog.vue'
import LoginService from '@/services/LoginService'
import GStore from '@/store'
export default {
  name: 'HomeView',
  inject: ['GStore'],
  data() {
    return {
      searchQuery: ''
    }
  },
  components: {
    CourseBlog
  },
  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase().trim()
      if (!query) {
        return this.GStore.course
      } else {
        return this.GStore.course.filter((item) => {
          return (
            item.course_id.toLowerCase().includes(query) ||
            item.course_name.toLowerCase().includes(query) ||
            item.examination.toLowerCase().includes(query) ||
            item.year.toLowerCase().includes(query)
          )
        })
      }
    }
  },
  methods: {
    showForm() {
      Swal.fire({
        title: 'Adding Course',
        html: `
    <input id="course_id" class="swal2-input numeric-input" type="text" placeholder="Course ID">
    <input id="course_name" class="swal2-input" placeholder="Course Name">
    <input id="year" class="swal2-input numeric-input" type="text" placeholder="Year">
    <select id="examination" class="swal2-select">
      <option value="midterm">Midterm</option>
      <option value="final">Final</option>
    </select>
  `,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const course_id = Swal.getPopup().querySelector('#course_id').value
          const course_name =
            Swal.getPopup().querySelector('#course_name').value
          const year = Swal.getPopup().querySelector('#year').value
          const examination =
            Swal.getPopup().querySelector('#examination').value
          const professor = this.GStore.user.firstname_EN

          const numericRegex = /^\d+$/
          if (!course_id.match(numericRegex) || !year.match(numericRegex)) {
            Swal.showValidationMessage(
              'Please enter a valid numeric value for Course ID and Year'
            )
            return false
          }

          if (
            !course_id ||
            !course_name ||
            !year ||
            !examination ||
            !professor
          ) {
            Swal.showValidationMessage('Please fill in all fields')
            return false
          }

          return { course_id, course_name, year, examination, professor }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { course_id, course_name, year, examination, professor } =
            result.value
          this.submitCourse(
            course_id,
            course_name,
            year,
            examination,
            professor
          )
        }
      })
    },
    submitCourse(course_id, course_name, year, examination, professor) {
      const formData = {
        course_id,
        course_name,
        year,
        examination,
        professor
      }
      // console.log(formData)
      CourseService.add_course(formData)
        .then(() => {
          location.reload()
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to add course', 'error')
          console.error(error)
        })
    },
    logout() {
      // this.accessToken = null
      this.userInfo = null
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const formData = {
      code
    }
    console.log(formData)
    if (code) {
      LoginService.getAccessToken(formData)
        .then((response) => {
          localStorage.setItem('accessToken', code)
          this.GStore.user = response.data
          const name = GStore.user.firstname_EN
          const courseFormData = new FormData()
          courseFormData.append('name', name)
          CourseService.get_course(courseFormData).then((response) => {
            GStore.course = response.data
            console.log(GStore.course)
          })
        })
        .catch((error) => {
          console.error('Error fetching access token:', error)
        })
    }
  }
}
</script>
