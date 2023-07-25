<template>
  <div>
    {{ GStore.compareDetail.name }}
    <br />
    {{ GStore.compareDetail.answer }}
    <h2>similar answer</h2>
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
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
