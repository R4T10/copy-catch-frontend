<template>
  <div>
    {{ GStore.compareDetail.question }}
    <br />
    {{ GStore.compareDetail.name }}
    <br />
    {{ GStore.compareDetail.answer }}
    <h2>similar answer</h2>
    <div v-if="GStore.compareDetail.check_table == 'student'">
      <div
        v-for="compare_data in GStore.compareDetail.compare_data"
        :key="compare_data"
      >
        <span>
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
export default {
  inject: ['GStore']
}
</script>
