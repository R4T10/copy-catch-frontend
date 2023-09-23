<template>
  <div class="course">
    <div class="coursedetail">{{ GStore.detail.course_id }}</div>
    <div class="coursedetail">{{ GStore.detail.course_name }}</div>
    <div class="coursedetail">{{ GStore.detail.year }}</div>
    <div class="coursedetail">{{ GStore.detail.examination }}</div>
  </div>

  <div>
    <div class="navbtn">
      <button @click="go_to_student" id="tab">Student's Answer</button>
      <button @click="go_to_google" id="tab">Google Search</button>
      <button
        @click="go_to_student_list"
        id="tab"
        style="background: rgb(255, 208, 0)"
        :class="{ 'is-disabled': isDisabled }"
      >
        Student List
      </button>
    </div>

    <table>
      <tr>
        <th>Student ID</th>
        <th>Student Name</th>
        <th>Student Email</th>
        <th></th>
      </tr>
      <tr v-for="(student, rowIndex) in GStore.students" :key="rowIndex">
        <td>
          {{ student.student_id }}
        </td>
        <td>{{ student.student_name }}</td>
        <td>{{ student.student_mail }}</td>
        <td>
          <button class="editemail" @click="showStudentDetails(student)">
            Edit Email
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import router from '../router'
import GStore from '@/store'
import Swal from 'sweetalert2'
import StudentService from '@/services/StudentService.js'
export default {
  inject: ['GStore'],
  data() {
    return {
      isDisabled: true
    }
  },
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
      <div class="container">
      <input id="student_mail" class="swal2-input email-input" type="text" placeholder="Student Email">
      <span class="email-domain">@cmu.ac.th</span>
      </div>
      <style>
      #student_id, #student_name {
        width: 300px;
      }
      .email-input {
        width: 190px;
        margin: 20px 18px 20px 0;
      }
      .email-domain {
        margin: 0;
      }
      .container{
        border-color: #ff0000;
      }

    </style>
    `,

        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const mail = Swal.getPopup().querySelector('#student_mail').value

          if (!mail) {
            Swal.showValidationMessage('Please fill the email')
            return false
          } else {
            const mail_cmu = mail + '@cmu.ac.th'
            return { student_id, student_name, mail_cmu }
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result)
          const { student_id, student_name, mail_cmu } = result.value
          this.submitEmail(student_id, student_name, mail_cmu)
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
        .then((response) => {
          if (response.status == 200) {
            Swal.fire('Update email success', '', 'success')
            StudentService.get_student_list(GStore.detail.id).then(
              (response) => {
                GStore.students = response.data
              }
            )
          }
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
.course {
  margin: 30px 0 0;
}

.coursedetail {
  font-size: 20px;
  display: inline;
  padding: 0 20px;
  font-weight: bold;
}

.navbtn {
  margin-top: 30px;
  width: 100%;
}

#tab {
  width: 150px;
  height: 30px;
  color: white;
  background: #1c499e;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  margin: 0 5px 10px;
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

#tab:hover {
  box-shadow: 2px 2px 2px 2px rgb(197, 193, 193);
}

table {
  margin: auto;
  margin-bottom: 100px;
}

th {
  background: #072a6c;
  color: white;
  font-weight: 500;
  text-align: center;
}

th,
td {
  padding: 10px 15px;
}

tr {
  border-top: 1px solid #161240;
  background: rgb(245, 250, 247);
}

.editemail {
  width: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: 1px solid grey;
  border-radius: 8px;
  font-weight: 300;
  background: rgb(245, 250, 247);
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

.editemail:hover {
  box-shadow: 2px 2px 2px 2px rgb(197, 193, 193);
}

#tab.is-disabled {
  pointer-events: none;
}
</style>
