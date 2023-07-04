import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '../views/TableView.vue'
import CourseService from '@/services/CourseService'
import UploadView from '../views/UploadView.vue'
import GStore from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: () => {
      return CourseService.get_course().then((response) => {
        GStore.course = response.data
      })
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/table/:id',
    name: 'table',
    props: true,
    component: TableView,
    beforeEnter: (to, from, next) => {
      console.log('--this go to table--')
      GStore.detail = GStore.course.find(
        (itemInArray) => itemInArray.id == to.params.id
      )
      if (GStore.detail.file == false) {
        next('/upload/' + to.params.id)
      } else {
        next()
      }
    }
  },
  {
    path: '/upload/:id',
    name: 'UploadView',
    component: UploadView,
    props: true,
    beforeEnter: (to) => {
      console.log(to.params.id)
      GStore.detail = GStore.course.find(
        (itemInArray) => itemInArray.id == to.params.id
      )
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
