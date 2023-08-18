<template>
  <div>
    {{ GStore.compareDetail.question }}
    <br />
    {{ GStore.compareDetail.name }}
    <br />
    {{ GStore.compareDetail.answer }}
    <h2>similar answer</h2>
    <div v-if="GStore.compareDetail.check_table == 'student'">
      <div
        v-for="compare_data in GStore.compareDetail.compare_data"
        :key="compare_data"
      >
        <span>
          {{ compare_data.student_name }} <br />
          {{ compare_data.answer }}
        </span>
      </div>
    </div>

    <div v-if="GStore.compareDetail.check_table == 'google'">
      <div
        v-for="compare_data in GStore.compareDetail.compare_data"
        :key="compare_data"
      >
        <span> {{ compare_data.snippet }} </span>
        <br />
        <a :href="compare_data.link"> {{ compare_data.link }} </a>
      </div>
    </div>
    <button @click="sendEmail">Send the email</button>
  </div>
</template>
<script>
import EmailService from '@/services/EmailService'
import GStore from '@/store'
import Swal from 'sweetalert2'
export default {
  inject: ['GStore'],
  methods: {
    sendEmail() {
      const formData = {
        receive_name: GStore.compareDetail.name
      }
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
              Swal.fire('Error', 'Failed to Sending email', 'error')
              console.error(error)
            })
        }
      })
    }
  }
}
</script>
