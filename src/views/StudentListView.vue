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
    </tr>
    <tr v-for="(student, index) in GStore.students" :key="index">
      <td>{{ student.student_id }}</td>
      <td>{{ student.student_name }}</td>
      <td>{{ student.student_mail }}</td>
    </tr>
  </table>
  <!-- {{ GStore.students }} -->
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
    go_to_student_list() {
      router.push({
        name: 'student_list',
        params: { id: GStore.detail.id }
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
