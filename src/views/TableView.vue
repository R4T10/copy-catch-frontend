<template>
  <div class="navbtn">
    <button @click="go_to_student" id="uploadbtn" style="color: black">
      Student
    </button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
  </div>
  <table v-if="table_student && GStore.result != null">
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
  <!-- 
  <table v-if="table_google">
    <tr>
      <th></th>
      <th v-for="question in GStore.google_result.question" :key="question">
        {{ question }}
      </th>
    </tr>
    <tr v-for="result in GStore.google_result.data" :key="result">
      <td>{{ result.student_id }}</td>
      <td v-for="percentage in result.answers" :key="percentage">
        {{ percentage }}
      </td>
    </tr>
  </table> -->
</template>
<script>
import Swal from 'sweetalert2'
import ResultService from '@/services/ResultService.js'
import router from '../router'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  data() {
    return {
      table_student: true,
      table_google: false
    }
  },
  methods: {
    go_to_student() {
      this.table_student = true
      this.table_google = false
    },
    go_to_google() {
      this.table_student = false
      this.table_google = true
    },
    dataView(rowIndex, index, percentage) {
      console.log(
        `Row Index: ${rowIndex}, Column Index: ${index}, Percentage: ${percentage.percentage}`
      )
      const comparison_data =
        GStore.result.data[rowIndex].answers[index].comparison_data
      console.log(comparison_data)
      const name = GStore.result.data[rowIndex].student_name
      const answer = GStore.result.data[rowIndex].answers[index].answer
      console.log(name)
      console.log(answer)
      GStore.compareDetail = {
        name: name,
        answer: answer,
        compare_data: comparison_data
      }
      console.log(GStore.compareDetail)
      if (percentage.percentage > 0) {
        router.push({
          name: 'detail',
          params: { id: GStore.detail.id }
        })
      }

      // if (percentage.percentage > 0) {
      //   const comparisonData = keep.comparison_data
      //   console.log(comparisonData)
      // }
    }
  },
  beforeRouteEnter() {
    if (GStore.table_id != GStore.detail.id) {
      Swal.fire({
        title: 'Processing',
        html: '',
        didOpen: () => {
          Swal.showLoading()
          ResultService.tableResult(GStore.detail.id).then((response) => {
            GStore.result = response.data
            if (response.status === 200) {
              console.log(GStore.result)
              Swal.hideLoading() // Close the loading spinner
              Swal.fire('Compare success', '', 'success')
            }
          })
        }
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
