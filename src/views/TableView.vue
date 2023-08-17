<template>
  <div class="navbtn">
    <button @click="go_to_student" id="uploadbtn" style="color: black">
      Student
    </button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
    <button @click="go_to_student_list" id="uploadbtn">Student List</button>
  </div>
  <span
    >Course ID: {{ GStore.detail.course_id }} Course Name:
    {{ GStore.detail.course_name }} Examination:{{
      GStore.detail.examination
    }}
    Year:{{ GStore.detail.year }}</span
  >
  <table v-if="GStore.result != null">
    <tr>
      <th></th>
      <th v-for="question in GStore.result.question" :key="question">
        {{ question }}
      </th>
    </tr>
    <tr
      v-for="(result, rowIndex) in GStore.result.data"
      :key="result.student_id"
    >
      <td>{{ result.student_id }}</td>
      <td
        v-for="(percentage, index) in result.answers"
        :key="index"
        @click="dataView(rowIndex, index, percentage)"
      >
        {{ percentage.percentage }}
      </td>
    </tr>
  </table>
</template>
<script>
import Swal from 'sweetalert2'
import ResultService from '@/services/ResultService.js'
import StudentService from '@/services/StudentService.js'
import router from '../router'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  data() {
    return {
      finish: false
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
    dataView(rowIndex, index, percentage) {
      console.log(
        `Row Index: ${rowIndex}, Column Index: ${index}, Percentage: ${percentage.percentage}`
      )
      const comparison_data =
        GStore.result.data[rowIndex].answers[index].comparison_data
      const name = GStore.result.data[rowIndex].student_name
      const answer = GStore.result.data[rowIndex].answers[index].answer
      const question = GStore.result.data[rowIndex].answers[index].question_text
      console.log(name)
      console.log(answer)
      console.log(comparison_data)
      GStore.compareDetail = {
        name: name,
        answer: answer,
        compare_data: comparison_data,
        question: question,
        check_table: 'student'
      }
      if (percentage.percentage > 0) {
        router.push({
          name: 'detail',
          params: { id: GStore.detail.id }
        })
      }
    }
  },
  beforeRouteEnter() {
    if (GStore.table_id != GStore.detail.id) {
      if (GStore.result == null) {
        Swal.fire({
          title: 'Processing',
          html: '',
          didOpen: () => {
            Swal.showLoading()
            ResultService.tableResult(GStore.detail.id).then((response) => {
              GStore.result = response.data
              console.log(GStore.result)
              if (response.status === 200) {
                // ResultService.google_tableResult(GStore.detail.id).then(
                //   (response) => {
                // GStore.google_result = response.data
                // if (response.status === 200) {
                console.log(GStore.result)
                StudentService.get_student_list(GStore.detail.id).then(
                  (response) => {
                    GStore.students = response.data
                    if (response.status === 200) {
                      Swal.hideLoading()
                      Swal.fire('Compare success', '', 'success')
                    }
                  }
                )
                // }
                // }
                // )
              }
            })
          }
        })
      }
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
