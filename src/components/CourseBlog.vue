<template>
  <router-link
    :to="{
      name: 'table',
      params: { id: detail.id }
    }"
  >
    <div class="block">
      <span>
        Course ID: {{ detail.course_id }} Course Name:
        {{ detail.course_name }} Examination: {{ detail.examination }} Year:
        {{ detail.year }}
      </span>
    </div>
  </router-link>
  <button @click="showForm">Edit detail</button>
  <button @click="deleteCourse">Delete</button>
  <button @click="reUploadFile">Reupload file</button>
</template>

<script>
import CourseService from '@/services/CourseService'
import Swal from 'sweetalert2'
import router from '../router'
export default {
  inject: ['GStore'],
  name: 'CourseBlog',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteCourse() {
      const formData = new FormData()
      formData.append('id', this.detail.id)
      CourseService.delete_course(formData)
      const name = this.GStore.user.firstname_EN
      const courseFormData = new FormData()
      courseFormData.append('name', name)
      CourseService.get_course(courseFormData).then((response) => {
        this.GStore.course = response.data
      })
    },
    reUploadFile() {
      Swal.fire({
        title: 'Are you sure to reupload the file?',
        showDenyButton: true,
        confirmButtonText: 'Confirm',
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: 'UploadView', params: { id: this.detail.id } })
        }
      })
    },
    showForm() {
      const currentYear = new Date().getFullYear()
      const baseYear = 2019
      Swal.fire({
        title: 'Edit Course',
        html: `
        <input id="course_id" class="swal2-input numeric-input" type="text" placeholder="Course ID" maxlength="6">
    <input id="course_name" class="swal2-input" placeholder="Course Name" maxlength="50">
    <input id="year" class="swal2-input numeric-input" type="text" placeholder="Year" maxlength="4">
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
          } else if (course_id.length !== 6) {
            Swal.showValidationMessage('Course ID must be 6 digits long')
            return false
          } else if (year.length !== 4) {
            Swal.showValidationMessage('Year must be 4 digits long')
            return false
          } else if (parseInt(year) > currentYear) {
            Swal.showValidationMessage(
              'Year cannot be more than ' + currentYear
            )
            return false
          } else if (parseInt(year) < baseYear) {
            Swal.showValidationMessage(
              'Year cannot be earlier than ' + baseYear
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
            this.detail.id,
            course_id,
            course_name,
            year,
            examination,
            professor
          )
        }
      })
    },
    submitCourse(id, course_id, course_name, year, examination, professor) {
      const formData = {
        id,
        course_id,
        course_name,
        year,
        examination,
        professor
      }
      // console.log(formData)
      CourseService.edit_course(formData)
        .then(() => {
          const name = this.GStore.user.firstname_EN
          const courseFormData = new FormData()
          courseFormData.append('name', name)
          CourseService.get_course(courseFormData).then((response) => {
            this.GStore.course = response.data
          })
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to edit course', 'error')
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.block {
  outline-style: solid;
  margin-bottom: 50px;
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  margin: auto;
}
</style>
