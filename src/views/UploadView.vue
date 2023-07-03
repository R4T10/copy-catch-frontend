<template>
  <span
    >Course ID: {{ GStore.detail.course_id }} Course Name:
    {{ GStore.detail.course_name }} Examination:{{
      GStore.detail.examination
    }}
    Year:{{ GStore.detail.year }}</span
  >
  <DragDrop></DragDrop>
</template>
<script>
import DragDrop from '@/components/DragDropZip.vue'
export default {
  inject: ['GStore'],
  components: {
    DragDrop
  }
}
</script>
