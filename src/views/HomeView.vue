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
  }
}
</script>
