<template>
  <!-- <nav>
    <router-link to="/">Students</router-link> |
    <router-link to="/about">Google Search</router-link>
  </nav> -->

  <div class="block-nav">
    <p v-if="GStore.user != null">{{ GStore.user.cmuitaccount_name }}</p>
    <button v-if="GStore.user != null" @click="logout">Logout</button>
    <button v-if="GStore.user == null" @click="login">
      Login with CMU OAuth
    </button>
  </div>
  <router-view />
</template>
<script>
import LoginService from '@/services/LoginService'
export default {
  inject: ['GStore'],
  methods: {
    logout() {
      localStorage.setItem('access_token', 'undefined')
      localStorage.setItem('oauth_code', 'undefined')
      this.GStore.user = null
      this.$router.push({ name: 'home' })
    },
    login() {
      localStorage.setItem('access_token', 'undefined')
      localStorage.setItem('oauth_code', 'undefined')
      LoginService.login().then((response) => {
        window.location.href = response.data
      })
    }
  }
}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  width: 100%;
  height: 80px;
  background: #04724d;
  margin: 0 0 80px;
}
p {
  margin: 0 0 80px;
}
.block-nav {
  width: 100%;
  height: 80px;
  background: #04724d;
  margin: 0 0 80px;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
