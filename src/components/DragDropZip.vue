<template>
  <div class="drag-drop-zone" @drop="handleDrop" @dragover.prevent>
    <div>
      <span v-if="selectedFile">{{ selectedFile.name }}</span>
    </div>
    <label for="fileInput">
      <img class="image-icon" src="@/assets/upload.png" alt="Selected File" />
      <input
        type="file"
        id="fileInput"
        class="file-input"
        @change="handleFileSelect"
        accept=".zip"
      />
    </label>
    <p>Drag and drop a .zip file here or click icon to select a file.</p>
    <button @click="confirmFile" v-if="selectedFile">Confirm</button>
  </div>
</template>

<script>
import FileService from '@/services/FileService.js'
export default {
  data() {
    return {
      selectedFile: null,
      files: null,
      formData: null
    }
  },
  methods: {
    handleDrop(event) {
      event.preventDefault()
      this.files = event.dataTransfer.files
      this.handleFiles(this.files)
    },
    handleFileSelect(event) {
      this.files = event.target.files
      this.handleFiles(this.files)
    },
    handleFiles(files) {
      const file = files[0]
      if (file && file.type === 'application/x-zip-compressed') {
        this.selectedFile = file
        this.formData = new FormData()
        this.formData.append('file', file)
      }
    },
    confirmFile() {
      FileService.uploadFile(this.formData)
    }
  }
}
</script>

<style scoped>
.drag-drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  margin: auto;
}
.file-input-label {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
}
.file-input {
  display: none;
  width: 100px;
}
.image-icon {
  width: 100px;
  height: 100px;
}
</style>
