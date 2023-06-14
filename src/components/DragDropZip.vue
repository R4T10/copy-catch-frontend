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
      />
    </label>
    <p>Drag and drop a .zip file here or click icon to select a file.</p>
    <button @click="confirmFile" v-if="selectedFile">Upload</button>
  </div>
  {{ GStore.result.percentage }}
</template>

<script>
import FileService from '@/services/FileService.js'
import ResultService from '@/services/ResultService.js'
import Swal from 'sweetalert2'
import GStore from '@/store'
export default {
  inject: ['GStore'],
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid file type.'
        })
      }
    },
    confirmFile() {
      Swal.fire({
        title: 'Are you sure to confirm this file to check plagarism',
        showDenyButton: true,
        confirmButtonText: 'Confirm',
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Processing',
            html: 'Please wait',
            didOpen: () => {
              Swal.showLoading()
              FileService.uploadFile(this.formData)
                .then((response) => {
                  if (response.status == 200) {
                    // setTimeout(() => {
                    ResultService.tableResult().then((response) => {
                      GStore.result = response.data
                      if (response.status == 200) {
                        Swal.hideLoading() // Close the loading spinner
                        Swal.fire('Upload success', '', 'success')
                      }
                    })
                    // }, 1000)
                  } else {
                    Swal.hideLoading() // Close the loading spinner
                    Swal.fire('Upload failed', '', 'error')
                  }
                })
                .catch((error) => {
                  Swal.hideLoading() // Close the loading spinner
                  Swal.fire('Error', error.message, 'error')
                })
            }
          })
        }
        // else if (result.isDenied) {
        // }
      })
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
