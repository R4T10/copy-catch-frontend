<template>
  <button @click="go_to_student" id="uploadbtn">Student</button>
  <button @click="go_to_google" id="uploadbtn">Google</button>
  <table>
    <tr>
      <th></th>
      <th v-for="question in GStore.google_result.question" :key="question">
        {{ question }}
      </th>
    </tr>
    <!-- <tr v-for="result in GStore.result.data" :key="result">
      <td>{{ result.student_id }}</td>
      <td v-for="percentage in result.answers" :key="percentage">
        {{ percentage }}
      </td>
    </tr> -->
    <tr v-for="result in GStore.google_result.data" :key="result">
      <td>{{ result.student_id }}</td>
      <td v-for="percentage in result.answers" :key="percentage">
        {{ percentage }}
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  inject: ['GStore'],
  methods: {
    go_to_student() {
      this.$router.push({ path: '/table' })
    },
    go_to_google() {
      this.$router.push({ path: '/google_table' })
    }
  }
}
</script>
<style scoped>
table {
  margin: auto;
  margin-bottom: 100px;
}

th {
  background: rgb(43, 43, 238);
  color: #eff9fe;
  font-weight: 100;
  text-align: center;
}
#uploadbtn {
  width: 100px;
  height: 30px;
  color: white;
  background: blue;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

table,
th,
td {
  padding: 10px 15px;
}

tr {
  border-top: 1px solid #161240;
  background: #eff9fe;
}
</style>
