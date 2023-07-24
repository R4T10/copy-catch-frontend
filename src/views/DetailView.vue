<template>
  <div v-for="data in filteredCompareData" :key="data">
    {{ data.student_name }}
    <br />
    {{ data.answer }}
  </div>
  <h2>similar answer</h2>
  <br />
  <div v-for="compare_data in removeMatchingData" :key="compare_data">
    <span>
      {{ compare_data.student_name }} <br />
      {{ compare_data.answer }}
    </span>
  </div>
</template>
<script>
export default {
  inject: ['GStore'],
  computed: {
    filteredCompareData() {
      console.log(this.GStore.compareDetail.copare_data)
      return this.GStore.compareDetail.copare_data.filter(
        (itemInArray) =>
          itemInArray.student_name === this.GStore.compareDetail.name
      )
    },
    removeMatchingData() {
      const filteredData = this.GStore.compareDetail.copare_data.filter(
        (itemInArray) =>
          itemInArray.student_name !== this.GStore.compareDetail.name
      )
      return filteredData
    }
  }
}
</script>
