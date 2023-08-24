<template>
  <div class="drag-drop-zone" @drop="handleDrop" @dragover.prevent>
    <div>
      <span v-if="selectedFile" id="file">[{{ selectedFile.name }}]</span>
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
    <p>Drag and drop a file here or click on the icon to select a file</p>
    <button @click="confirmFile" v-if="selectedFile" id="uploadbtn">
      Upload
    </button>
  </div>
</template>

<script>
import FileService from '@/services/FileService.js'
// import ResultService from '@/services/ResultService.js'
import CourseService from '@/services/CourseService'
import router from '../router'
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
      if (file && file.name.endsWith('.zip')) {
        this.selectedFile = file
        this.formData = new FormData()
        this.formData.append('file', file)
        this.formData.append('id', GStore.detail.id)
      } else {
        Swal.fire('Invalid file type', '', 'error')
      }
    },
    confirmFile() {
      Swal.fire({
        title: 'Are you sure to confirm this file to check plagarism?',
        showDenyButton: true,
        confirmButtonText: 'Confirm',
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Processing',
            html: '',
            didOpen: () => {
              Swal.showLoading()
              if (GStore.detail.file == false) {
                console.log(GStore.detail)
                FileService.uploadFile(this.formData)
                  .then((response) => {
                    console.log(response.data)
                    console.log(this.formData)
                    Swal.hideLoading()
                    Swal.fire('Upload success', '', 'success')
                    const name = this.GStore.user.firstname_EN
                    const courseFormData = new FormData()
                    courseFormData.append('name', name)
                    CourseService.get_course(courseFormData)
                      .then((response) => {
                        GStore.course = response.data
                        console.log(GStore.course)
                        console.log(GStore.detail)
                        router.push({
                          name: 'table',
                          params: { id: GStore.detail.id }
                        })
                      })
                      .catch((error) => {
                        console.error('Failed to fetch course data:', error)
                      })
                  })
                  .catch(() => {
                    Swal.hideLoading()
                    Swal.fire('Invalid file format', '', 'warning')
                  })
              }
              if (GStore.detail.file == true) {
                console.log(GStore.detail)
                FileService.reuploadFile(this.formData)
                  .then((response) => {
                    console.log(response.data)
                    console.log(this.formData)
                    Swal.hideLoading()
                    Swal.fire('Re-upload success', '', 'success')
                    const name = this.GStore.user.firstname_EN
                    const courseFormData = new FormData()
                    courseFormData.append('name', name)
                    CourseService.get_course(courseFormData)
                      .then((response) => {
                        GStore.course = response.data
                        console.log(GStore.course)
                        console.log(GStore.detail)
                        router.push({
                          name: 'table',
                          params: { id: GStore.detail.id }
                        })
                      })
                      .catch((error) => {
                        console.error('Failed to fetch course data:', error)
                      })
                  })
                  .catch(() => {
                    Swal.hideLoading()
                    Swal.fire('Invalid file format', '', 'warning')
                  })
              }
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
  padding: 150px;
  margin: 0 40px;
  background: rgb(245, 250, 247);
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
  padding: 10px;
}
#uploadbtn {
  width: 100px;
  height: 30px;
  color: white;
  background: blue;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}
#file {
  font-weight: bold;
}
</style>
