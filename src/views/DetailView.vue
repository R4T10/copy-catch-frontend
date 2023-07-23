<template>
  <div>
    {{ GStore.compareDetail.name }}
  </div>
  <div
    v-for="compare_data in GStore.compareDetail.copare_data"
    :key="compare_data"
  >
    <span>
      {{ compare_data.student_name }} <br />
      {{ compare_data.answer }}
    </span>
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
