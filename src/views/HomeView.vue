<template>
  <div class="home">
    <button @click="showForm">Adding Course</button>
  </div>
  <CourseBlog v-for="detail in GStore.course" :key="detail.id" :detail="detail">
  </CourseBlog>
</template>

<script>
import Swal from 'sweetalert2'
import CourseService from '@/services/CourseService'
import CourseBlog from '@/components/ฺCourseBlog.vue'
export default {
  name: 'HomeView',
  inject: ['GStore'],
  components: {
    CourseBlog
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
    }
  }
}
</script>
