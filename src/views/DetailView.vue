<template>
  <div class="heading">
    <h2>
      {{ GStore.compareDetail.question_number }}
      {{ GStore.compareDetail.question }}
    </h2>
    <button @click="sendEmail">Send an email</button>
  </div>
  <div class="answerbox">
    <h3>
      {{ GStore.compareDetail.student_id }} {{ GStore.compareDetail.name }}
    </h3>
    <p>{{ GStore.compareDetail.answer }}</p>
  </div>

  <h2>Plagiarism Detected</h2>
  <div v-if="GStore.compareDetail.check_table == 'student'">
    <div
      class="rankbox"
      v-for="compare_data in GStore.compareDetail.compare_data"
      :key="compare_data"
    >
      <div>
        <div>
          <h3>
            <span id="percentage">{{ compare_data.percentage }}%</span>
            {{ compare_data.student_id }} {{ compare_data.student_name }}
          </h3>
        </div>
        <p>{{ compare_data.answer }}</p>
      </div>
    </div>
  </div>

  <div v-if="GStore.compareDetail.check_table == 'google'">
    <div
      class="rankbox"
      v-for="compare_data in GStore.compareDetail.compare_data"
      :key="compare_data"
    >
      <div>
        <h3>
          <span id="percentage">{{ compare_data.percentage }}%</span>
          {{ compare_data.snippet }}
        </h3>
        <a :href="compare_data.link" target="_blank">{{ compare_data.link }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import EmailService from '@/services/EmailService'
import GStore from '@/store'
import Swal from 'sweetalert2'
import StudentService from '@/services/StudentService.js'
export default {
  inject: ['GStore'],
  methods: {
    sendEmail() {
      const formData = {
        student_id: GStore.compareDetail.student_id,
        course_id: GStore.compareDetail.course_id,
        course_name: GStore.compareDetail.course_name,
        examination: GStore.compareDetail.examination
      }
      console.log(GStore.compareDetail.course_id)
      console.log(GStore.compareDetail.course_name)
      console.log(GStore.compareDetail.examination)
      console.log(formData)
      Swal.fire({
        title: 'Processing',
        html: '',
        didOpen: () => {
          Swal.showLoading()
          EmailService.send_email(formData)
            .then((response) => {
              if (response.status === 200) {
                Swal.hideLoading()
                Swal.fire({
                  title: 'Sending email success',
                  showConfirmButton: false,
                  timer: 2000
                })
              }
            })
            .catch((error) => {
              Swal.fire('Error', 'Failed to send an email', 'error')
              console.error(error.response.data)
              if (error.response.data == 'Student email not found') {
                Swal.fire({
                  title: 'Edit Student Email',
                  html: `
      <input id="student_id" class="swal2-input" type="text" value="${GStore.compareDetail.student_id}" readonly>
      <input id="student_name" class="swal2-input" type="text" value="${GStore.compareDetail.name}" readonly>
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
                    const mail =
                      Swal.getPopup().querySelector('#student_mail').value

                    if (!mail) {
                      Swal.showValidationMessage('Please fill the email')
                      return false
                    } else {
                      const mail_cmu = mail + '@cmu.ac.th'
                      const student_id = GStore.compareDetail.student_id
                      const student_name = GStore.compareDetail.name
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
              }
            })
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
.heading {
  display: flex; /* Display its children in a row */
  align-items: center; /* Vertically align items */
  justify-content: space-between;
}

h2 {
  text-align: left;
  padding: 0 55px;
}

button {
  width: 150px;
  height: 30px;
  margin-right: 55px;
  color: white;
  background: #1c499e;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

button:hover {
  box-shadow: 2px 2px 2px 2px rgb(197, 193, 193);
}

.answerbox {
  width: 90%;
  height: 200px;
  text-align: left;
  margin: auto;
  padding: 0 20px;
  margin-bottom: 50px;
  overflow-y: auto;
  background: rgb(245, 250, 247);
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
  border-radius: 5px;
}

.rankbox {
  width: 90%;
  height: 150px;
  text-align: left;
  margin: auto;
  padding: 0 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  background: rgb(245, 250, 247);
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
  border-radius: 5px;
}

a:hover {
  color: #04724d;
}

#percentage {
  color: red;
}
</style>
