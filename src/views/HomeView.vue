<template>
  <div class="home">
    <drag-drop-zip></drag-drop-zip>
  </div>
</template>
<script>
// @ is an alias to /src
import DragDropZip from '@/components/DragDropZip.vue'
export default {
  name: 'HomeView',
  components: {
    DragDropZip
  }
}
</script>
