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
        {{ detail.year }} Professor: {{ detail.professor }}
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
      location.reload()
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
      Swal.fire({
        title: 'Edit Course',
        html: `
          <input id="course_id" class="swal2-input" placeholder="Course ID">
          <input id="course_name" class="swal2-input" placeholder="Course Name">
          <input id="year" class="swal2-input" placeholder="Year">
          <select id="examination" class="swal2-select">
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>
          <input id="professor" class="swal2-input" placeholder="Professor">
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
          const professor = Swal.getPopup().querySelector('#professor').value

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
          location.reload()
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
