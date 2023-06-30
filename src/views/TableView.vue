<template>
  <div class="navbtn">
    <button disabled @click="go_to_student" id="uploadbtn" style="color: black">
      Student
    </button>
    <button @click="go_to_google" id="uploadbtn">Google Search</button>
  </div>
  <table>
    <tr>
      <th></th>
      <th v-for="question in GStore.result.question" :key="question">
        {{ question }}
      </th>
    </tr>
    <!-- <tr v-for="result in GStore.result.data" :key="result">
      <td>{{ result.student_id }}</td>
      <td v-for="percentage in result.answers" :key="percentage">
        {{ percentage }}
      </td>
    </tr> -->
    <tr v-for="result in GStore.result.data" :key="result">
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
