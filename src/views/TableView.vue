<template>
  <h2 v-if="table_student">Student</h2>
  <h2 v-if="table_google">Google Search</h2>
  <div class="navbtn">
    <button @click="go_to_student" id="uploadbtn">Student</button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
  </div>
  <div class="scrolltable">
    <table v-if="table_student">
      <tr>
        <th></th>
        <th v-for="question in GStore.result.question" :key="question">
          {{ question }}
        </th>
      </tr>
      <tr v-for="result in GStore.result.data" :key="result">
        <td>{{ result.student_id }}</td>
        <td v-for="percentage in result.answers" :key="percentage">
          {{ percentage }}
        </td>
      </tr>
    </table>

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
    </table>
  </div>
</template>
<script>
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
    }
  }
}
</script>
<style scoped>
h2 {
  margin: 0 0 40px;
}

.scrolltable {
  height: 620px;
  overflow-y: scroll;
}

table {
  width: 100%;
  margin: auto;
}

th {
  background: #072a6c;
  color: white;
  font-weight: 100;
  text-align: center;
  position: sticky;
  top: 0;
}

.navbtn {
  position: fixed;
  right: 2px;
  top: 223px;
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
