<template>
  <div class="navbtn">
    <button @click="go_to_student" id="uploadbtn">Student</button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
    <button @click="go_to_student_list" id="uploadbtn" style="color: black">
      Student List
    </button>
  </div>
  <span
    >Course ID: {{ GStore.detail.course_id }} Course Name:
    {{ GStore.detail.course_name }} Examination:{{
      GStore.detail.examination
    }}
    Year:{{ GStore.detail.year }} {{ GStore.detail.id }}</span
  >
  <table>
    <tr>
      <th>Student ID</th>
      <th>Student Name</th>
      <th>Student Mail</th>
      <th></th>
    </tr>
    <tr v-for="(student, rowIndex) in GStore.students" :key="rowIndex">
      <td>
        {{ student.student_id }}
      </td>
      <td>{{ student.student_name }}</td>
      <td>{{ student.student_mail }}</td>
      <td><button @click="showStudentDetails(student)">Edit Email</button></td>
    </tr>
    <!-- <tr>
       <td>{{ student.student_name }}</td>
    <td>{{ student.student_mail }}</td>
    </tr> -->
  </table>
  <!-- {{ GStore.students }} -->
</template>

<script>
import router from '../router'
import GStore from '@/store'
import Swal from 'sweetalert2'
import StudentService from '@/services/StudentService.js'
export default {
  inject: ['GStore'],
  methods: {
    go_to_student() {
      router.push({
        name: 'table',
        params: { id: GStore.detail.id }
      })
    },
    go_to_google() {
      router.push({
        name: 'table_google',
        params: { id: GStore.detail.id }
      })
    },
    go_to_student_list() {
      router.push({
        name: 'student_list',
        params: { id: GStore.detail.id }
      })
    },
    showStudentDetails(student) {
      const student_id = student.student_id
      const student_name = student.student_name
      Swal.fire({
        title: 'Edit Student Email',
        html: `
      <input id="student_id" class="swal2-input" type="text" value="${student_id}" readonly>
      <input id="student_name" class="swal2-input" type="text" value="${student_name}" readonly>
      <div class=container>
      <input id="student_mail" class="swal2-input email-input" type="text" placeholder="Student Email">
      <span class="email-domain">@cmu.ac.th</span>
      </div>
      <style>
      .email-input {
        width: 185px;
      }
      .container{
        border-color: #ff0000
      }

    </style>
    `,

        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const mail =
            Swal.getPopup().querySelector('#student_mail').value + '@cmu.ac.th'

          if (!mail) {
            Swal.showValidationMessage('Please fill the email')
            return false
          }

          return { student_id, student_name, mail }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result)
          const { student_id, student_name, mail } = result.value
          this.submitEmail(student_id, student_name, mail)
        }
      })
    },
    submitEmail(student_id, student_name, mail) {
      const formData = {
        student_id,
        student_name,
        mail,
        course_id: GStore.detail.id
      }
      console.log(formData)
      StudentService.update_email(formData)
        .then(() => {
          StudentService.get_student_list(GStore.detail.id).then((response) => {
            GStore.students = response.data
          })
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to edit email', 'error')
          console.error(error)
        })
    }
  }
}
</script>
<style scoped>
table {
  margin: auto;
  margin-bottom: 100px;
  padding-top: 30px;
}

th {
  background: #072a6c;
  color: white;
  font-weight: 100;
  text-align: center;
}

.navbtn {
  position: absolute;
  top: 70;
  right: 0;
}

#uploadbtn {
  width: 150px;
  height: 30px;
  color: white;
  background: #04724d;
  border: none;
  font-weight: bold;
  margin-left: 2px;
}

th,
td {
  padding: 10px 15px;
}

tr {
  border-top: 1px solid #161240;
  background: rgb(245, 250, 247);
}
</style>
