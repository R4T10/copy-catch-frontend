import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'

createApp(App).provide('GStore', GStore).use(router).mount('#app')
