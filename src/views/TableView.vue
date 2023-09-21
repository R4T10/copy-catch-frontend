<template>
  <div class="course">
    <div class="coursedetail">{{ GStore.detail.course_id }}</div>
    <div class="coursedetail">{{ GStore.detail.course_name }}</div>
    <div class="coursedetail">{{ GStore.detail.year }}</div>
    <div class="coursedetail">
      {{ GStore.detail.examination.charAt(0).toUpperCase()
      }}{{ GStore.detail.examination.slice(1) }}
    </div>
  </div>

  <div>
    <div class="navbtn">
      <button
        @click="go_to_student"
        id="tab"
        style="background: rgb(255, 208, 0)"
        :class="{ 'is-disabled': isDisabled }"
      >
        Student's Answer
      </button>
      <button @click="go_to_google" id="tab">Google Search</button>
      <button @click="go_to_student_list" id="tab">Student List</button>
    </div>

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
          id="percentage"
          v-for="(percentage, index) in result.answers"
          :key="index"
          @click="dataView(rowIndex, index, percentage)"
        >
          {{ percentage.percentage }}
        </td>
      </tr>
    </table>
  </div>
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
      finish: false,
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
    dataView(rowIndex, index, percentage) {
      console.log(
        `Row Index: ${rowIndex}, Column Index: ${index}, Percentage: ${percentage.percentage}`
      )
      const comparison_data =
        GStore.result.data[rowIndex].answers[index].comparison_data
      const name = GStore.result.data[rowIndex].student_name
      const answer = GStore.result.data[rowIndex].answers[index].answer
      const question = GStore.result.data[rowIndex].answers[index].question_text
      const question_number =
        GStore.result.data[rowIndex].answers[index].question
      const student_id = GStore.result.data[rowIndex].student_id
      const course_id = GStore.detail.course_id
      const course_name = GStore.detail.course_name
      const examination = GStore.detail.examination
      console.log(name)
      console.log(answer)
      console.log(comparison_data)
      console.log(student_id)
      console.log(course_id)
      console.log(course_name)
      console.log(examination)
      GStore.compareDetail = {
        name: name,
        answer: answer,
        question_number: question_number,
        compare_data: comparison_data,
        question: question,
        student_id: student_id,
        course_id: course_id,
        course_name: course_name,
        examination: examination,
        check_table: 'student'
      }
      console.log(GStore.compareDetail)
      if (percentage.percentage > 0) {
        router.push({
          name: 'detail',
          params: { id: GStore.detail.id }
        })
      }
    }
  },
  beforeRouteEnter() {
    console.log(GStore.table_id)
    console.log(GStore.detail.id)
    if (GStore.table_id != GStore.detail.id) {
      GStore.table_id = GStore.detail.id
      Swal.fire({
        title: 'Processing',
        html: '',
        didOpen: () => {
          Swal.showLoading()
          // if (GStore.result == null) {
          ResultService.tableResult(GStore.detail.id)
            .then((response) => {
              GStore.result = response.data
              console.log(GStore.result)
              // if (response.status === 200) {
              //   ResultService.google_tableResult(GStore.detail.id).then(
              //     (response) => {
              //       GStore.google_result = response.data
              if (response.status === 200) {
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
              }
              //     }
              //   )
              // }
            })
            .catch((error) => {
              Swal.fire('Error', 'Data is not found', 'error').then(
                (result) => {
                  if (result.isConfirmed) {
                    router.push({
                      name: 'course_list'
                    })
                  }
                }
              )
              console.error(error)
            })
          // }
        }
      })
    }
  }
}
</script>
<style scoped>
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

#percentage:hover {
  box-shadow: 1px 1px 1px 1px rgb(197, 193, 193);
}

#tab.is-disabled {
  pointer-events: none;
}
</style>
