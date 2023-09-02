<template>
  <router-link
    :to="{
      name: 'table',
      params: { id: detail.id }
    }"
  >
    <div class="block">
      <div id="block">{{ detail.course_id }}</div>
      <div id="block">{{ detail.course_name }}</div>
      <div id="block">{{ detail.year }}</div>
      <div id="block">
        {{ detail.examination.charAt(0).toUpperCase()
        }}{{ detail.examination.slice(1) }}
      </div>
      <div id="block">
        <button class="coursebtn" @click.prevent="showForm">Edit</button>
        <button
          class="coursebtn"
          :class="{ 'disabled-button': !detail.file }"
          @click.prevent="reUploadFile"
        >
          Reupload
        </button>
        <button class="coursebtn" id="delete" @click.prevent="deleteCourse">
          Delete
        </button>
      </div>
    </div>
  </router-link>
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
      Swal.fire({
        title: 'Are you sure to delete this course?',
        showDenyButton: true,
        confirmButtonText: 'Confirm',
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData()
          formData.append('id', this.detail.id)
          CourseService.delete_course(formData)
          const professor_email = this.GStore.user.cmuitaccount
          const courseFormData = new FormData()
          courseFormData.append('professor_email', professor_email)
          CourseService.get_course(courseFormData).then((response) => {
            this.GStore.course = response.data
          })
        }
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
      const course_id = this.detail.course_id
      const course_name = this.detail.course_name
      const year = this.detail.year

      Swal.fire({
        title: 'Edit a course',
        html: `
        <input id="course_id" class="swal2-input numeric-input" type="text" value="${course_id}"" maxlength="6">
    <input id="course_name" class="swal2-input"  value="${course_name}"" maxlength="50">
    <input id="year" class="swal2-input numeric-input" type="text" value="${year}""  maxlength="4">
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
          const professor_email = this.GStore.user.cmuitaccount
          const numericRegex = /^\d+$/
          if (
            !course_id ||
            !course_name ||
            !year ||
            !examination ||
            !professor_email
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

          return { course_id, course_name, year, examination, professor_email }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { course_id, course_name, year, examination, professor_email } =
            result.value
          this.submitCourse(
            this.detail.id,
            course_id,
            course_name,
            year,
            examination,
            professor_email
          )
        }
      })
    },
    submitCourse(
      id,
      course_id,
      course_name,
      year,
      examination,
      professor_email
    ) {
      const formData = {
        id,
        course_id,
        course_name,
        year,
        examination,
        professor_email
      }
      // console.log(formData)
      CourseService.edit_course(formData)
        .then(() => {
          const professor_email = this.GStore.user.cmuitaccount
          const courseFormData = new FormData()
          courseFormData.append('professor_email', professor_email)
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
  background: rgb(245, 250, 247);
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
  border-radius: 5px;
  height: 40px;
}

.block:hover {
  box-shadow: 2px 2px 2px 2px rgb(197, 193, 193);
}

#block {
  width: 270px;
  height: 40px;
  margin: 0 3px;
  display: inline-block;
  font-weight: 400;
  color: black;
}

.coursebtn {
  width: 70px;
  height: 25px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: 1px solid grey;
  border-radius: 8px;
  font-weight: 300;
  margin: 7.5px 5px;
  background: rgb(245, 250, 247);
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

.disabled-button {
  background-color: lightgrey;
  color: grey;
  pointer-events: none;
}

#delete {
  color: white;
  background: rgb(234, 47, 47);
}

.coursebtn:hover {
  box-shadow: 2px 2px 2px 2px rgb(197, 193, 193);
}
</style>
