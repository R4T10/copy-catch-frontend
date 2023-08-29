<template>
  <div>
    <h2>
      {{ GStore.compareDetail.question_number }}
      {{ GStore.compareDetail.question }}
    </h2>
    <button @click="sendEmail">Send the email</button>
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
        <span>
          {{ compare_data.student_id }} <br />
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
        receiver_name: GStore.compareDetail.name
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

<style scoped>
h2 {
  text-align: left;
  padding: 0 50px;
}

button {
  display: block;
  top: 0;
  right: 0;
}

.answerbox {
  width: 90%;
  height: 200px;
  border: 1px solid gray;
  margin: auto;
  text-align: left;
  padding: 0 20px;
  margin-bottom: 50px;
}

.rankbox {
  width: 90%;
  height: 100px;
  border: 1px solid gray;
  margin: auto;
  text-align: left;
  padding: 0 20px;
  margin-bottom: 30px;
}
</style>
