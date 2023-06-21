<template>
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
  inject: ['GStore']
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
