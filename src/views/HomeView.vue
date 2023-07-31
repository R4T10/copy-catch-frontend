<template>
  <div class="home">
    <button @click="login">Login with CMU OAuth</button>
  </div>
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: '',
      accessToken: null,
      userInfo: null
    }
  },
  methods: {
    login() {
      LoginService.login().then((response) => {
        window.location.href = response.data
      })
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const formData = {
      code
    }
    console.log(formData)
    if (code) {
      LoginService.getAccessToken(formData)
        .then((response) => {
          this.userInfo = response.data
        })
        .catch((error) => {
          console.error('Error fetching access token:', error)
        })
    }
  }
}
</script>
