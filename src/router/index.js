import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '../views/TableView.vue'
import UploadView from '../views/UploadView.vue'
import DetailView from '../views/DetailView.vue'
import GoogleTableView from '../views/GoogleTableView.vue'
import CourseView from '../views/CourseView.vue'
import StudentListView from '../views/StudentListView.vue'
import GStore from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/course_list',
    name: 'course_list',
    component: CourseView
  },
  {
    path: '/detail/:id',
    name: 'detail',
    props: true,
    component: DetailView,
    beforeEnter: (to) => {
      console.log(to.params.id)
      GStore.table_id = to.params.id
      GStore.detail = GStore.course.find(
        (itemInArray) => itemInArray.id == to.params.id
      )
    }
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
    path: '/table_google/:id',
    name: 'table_google',
    props: true,
    component: GoogleTableView,
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
    path: '/student_list/:id',
    name: 'student_list',
    props: true,
    component: StudentListView,
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
