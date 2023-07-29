<template>
  <div class="navbtn">
    <button @click="go_to_student" id="uploadbtn" style="color: black">
      Student
    </button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
  </div>
  <table v-if="GStore.google_result.question != null">
    <tr>
      <th></th>
      <th v-for="question in GStore.google_result.question" :key="question">
        {{ question }}
      </th>
    </tr>
    <tr
      v-for="(result, rowIndex) in GStore.google_result.data"
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
import router from '../router'
import GStore from '@/store'
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
    dataView(rowIndex, index, percentage) {
      console.log(
        `Row Index: ${rowIndex}, Column Index: ${index}, Percentage: ${percentage.percentage}`
      )
      const comparison_data =
        GStore.google_result.data[rowIndex].answers[index].comparison_data
      const name = GStore.google_result.data[rowIndex].student_name
      const answer = GStore.result.data[rowIndex].answers[index].answer
      console.log(name)
      console.log(answer)
      console.log(comparison_data)
      GStore.compareDetail = {
        name: name,
        answer: answer,
        compare_data: comparison_data,
        check_table: 'google'
      }

      // console.log(GStore.compareDetail)
      // console.log(GStore.result)
      // console.log('-----------------------------------')
      // console.log(GStore.google_result)
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
