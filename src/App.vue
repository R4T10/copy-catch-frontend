<template>
  <!-- <nav>
    <router-link to="/">Students</router-link> |
    <router-link to="/about">Google Search</router-link>
  </nav> -->

  <div class="block-nav">
    <p v-if="GStore.user != null">{{ GStore.user.cmuitaccount_name }}</p>
  </div>
  <router-view />
</template>
<script>
export default {
  inject: ['GStore']
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
