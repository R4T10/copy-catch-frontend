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
        {{ detail.professor.charAt(0)
        }}{{ detail.professor.slice(1).toLowerCase() }}
      </div>
    </div>
  </router-link>
  <button class="coursebtn" id="edit" @click="showForm">Edit</button>
  <button class="coursebtn" id="delete" @click="deleteCourse">Delete</button>
  <button class="coursebtn" id="reupload" @click="reUploadFile">
    Reupload
  </button>
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
  width: 1360px;
  background: rgb(245, 250, 247);
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

#block {
  width: 270px;
  height: 50px;
  display: inline-block;
  line-height: 50px;
  font-weight: 400;
  color: black;
}

.coursebtn {
  width: 100px;
  height: 25px;
  margin: 0 5px 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: 1px solid grey;
  border-radius: 5px;
  font-weight: 300;
}

#edit {
  color: white;
  background: rgb(27, 153, 27);
}

#delete {
  color: white;
  background: rgb(238, 49, 49);
}

#reupload {
  color: white;
  background: rgb(35, 35, 226);
}

#edit:hover,
#delete:hover,
#reupload:hover {
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}
</style>
