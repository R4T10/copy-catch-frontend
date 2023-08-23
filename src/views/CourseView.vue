<template>
  <div v-if="GStore.course" class="home">
    <input
      class="searchbar"
      type="text"
      v-model="searchQuery"
      placeholder="Search Year"
    />

    <table class="label">
      <th>Course ID</th>
      <th>Course Name</th>
      <th>Year</th>
      <th>Examination</th>
      <th>Professor</th>
    </table>

    <div class="course" v-if="GStore.course">
      <CourseBlog
        v-for="detail in filteredData"
        :key="detail.id"
        :detail="detail"
      >
      </CourseBlog>
    </div>

    <button class="addbtn" @click="showForm">+</button>
    <h2>User Information:</h2>
    <pre>{{ GStore.user }}</pre>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import CourseService from '@/services/CourseService'
import CourseBlog from '@/components/CourseBlog.vue'
import LoginService from '@/services/LoginService'
// import GStore from '@/store'
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
          // if(course_id )
          // if (!course_id.match(numericRegex) || !year.match(numericRegex)) {
          //   Swal.showValidationMessage(
          //     'Please enter a valid numeric value for Course ID and Year'
          //   )
          //   return false
          // }

          if (
            !course_id ||
            !course_name ||
            !year ||
            !examination ||
            !professor
          ) {
            Swal.showValidationMessage('Please fill in all fields')
            return false
          } else if (
            !course_id.match(numericRegex) ||
            !year.match(numericRegex)
          ) {
            Swal.showValidationMessage(
              'Please enter a valid numeric value for Course ID and Year'
            )
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
          const name = this.GStore.user.firstname_EN
          const courseFormData = new FormData()
          courseFormData.append('name', name)
          CourseService.get_course(courseFormData).then((response) => {
            this.GStore.course = response.data
          })
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to add course', 'error')
          console.error(error)
        })
    },
    fetchUserData(access_token) {
      LoginService.fetchUserInfo(access_token)
        .then((response) => {
          this.GStore.user = response.data
          const name = this.GStore.user.firstname_EN
          const courseFormData = new FormData()
          courseFormData.append('name', name)
          CourseService.get_course(courseFormData).then((response) => {
            this.GStore.course = response.data
            Swal.close()
          })
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
        })
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const get_code = urlParams.get('code')
    localStorage.setItem('oauth_code', get_code)
    const code = localStorage.getItem('oauth_code')
    console.log(code)
    const formData = {
      code
    }

    if (code) {
      const check = localStorage.getItem('access_token')
      console.log(check)
      if (check == 'undefined') {
        Swal.fire({
          html: '',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            Swal.showLoading()
            LoginService.getAccessToken(formData).then((response) => {
              console.log(response.data)
              const response_token = response.data.access_token
              localStorage.setItem('access_token', response_token)
              const access_token = localStorage.getItem('access_token')
              if (access_token != 'undefined') {
                this.fetchUserData(access_token)
              } else {
                console.log('No access_token')
              }
            })
          }
        })
      } else {
        if (this.GStore.user == null) {
          this.fetchUserData(check)
        }
      }
    }
  }
}
</script>

<style scoped>
.searchbar {
  width: 30%;
  height: 25px;
  padding: 5px;
  margin: 0 0 40px;
  border: 1.5px solid black;
  border-radius: 5px;
}

.label {
  margin: auto;
  background: #072a6c;
}

th {
  width: 250px;
  height: 30px;
  padding: 13px 10px 7px;
  color: white;
  font-weight: 500;
}

.course {
  margin: 30px;
}

.addbtn {
  display: block;
  margin: auto;
  margin-bottom: 20px;
  width: 1360px;
  height: 40px;
  border: none;
  border-radius: 0;
  background: rgb(222, 222, 222);
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
}

.addbtn:hover {
  color: white;
  background: rgb(139, 139, 139);
  border-radius: 5px;
}
</style>
