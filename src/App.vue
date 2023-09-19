<template>
  <!-- <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
  /> -->
  <div class="block-nav">
    <img class="logo-icon" src="@/assets/logo.png" @click="home" />
    <!-- <button class="user" v-if="GStore.user != null" @click="logout">
      {{ GStore.user.cmuitaccount_name.charAt(0).toUpperCase() }}
    </button> -->

    <button class="user" v-if="GStore.user != null" @click="toggleDropdown">
      {{ GStore.user.cmuitaccount_name.charAt(0).toUpperCase() }}
    </button>
    <div class="dropdown" v-if="showDropdown" @mouseleave="closeDropdown">
      <div
        v-if="GStore.user"
        class="dropdown-item"
        :class="{ 'is-disabled': isDisabled }"
      >
        {{
          GStore.user
            ? GStore.user.firstname_EN + ' ' + GStore.user.lastname_EN
            : ''
        }}
      </div>
      <div v-if="GStore.user" class="dropdown-item" @click="course">COURSE</div>
      <div v-if="GStore.user" class="dropdown-item" @click="logout">
        SIGN OUT
      </div>
    </div>

    <button class="signin" v-if="GStore.user == null" @click="login">
      SIGN IN
    </button>
  </div>
  <router-view />
</template>
<script>
import LoginService from '@/services/LoginService'
export default {
  inject: ['GStore'],
  data() {
    return {
      showDropdown: false,
      isDisabled: true
    }
  },

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
    },
    home() {
      this.$router.push({ name: 'home' })
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    course() {
      this.$router.push({ name: 'course_list' })
    },
    closeDropdown() {
      this.showDropdown = false
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

.block-nav {
  width: 100%;
  height: 80px;
  background: #04724d;
  margin: 0 0 40px;
}

.logo-icon {
  padding: 10px;
  position: absolute;
  left: 0;
}

.signin {
  background: none;
  border: none;
  color: white;
  padding: 27px 10px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  font-weight: bold;
}

.signin:hover {
  text-decoration: underline;
}

.user {
  background-color: white;
  color: #04724d;
  border-radius: 50%;
  border: none;
  font-size: 22px;
  font-weight: bold;
  line-height: 40px;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 10px;
}

.dropdown {
  position: absolute;
  top: 80px;
  right: 0;
  background: #04724d;
  color: white;
  font-weight: bold;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  list-style: none;
  padding: 15px 40px;
  border-top: 1px solid white;
}

.dropdown-item:hover {
  box-shadow: 1px 1px 1px 1px rgb(166, 163, 163);
}

.dropdown-item.is-disabled {
  pointer-events: none;
}
</style>
