import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/404.vue'

// Lazy loading
const Session = () => import('@/views/Session.vue')
const Sessions = () => import('@/views/Sessions.vue')
const Info = () => import('@/views/Info.vue')
const Settings = () => import('@/views/Settings.vue')
const Schedule = () => import('@/views/Schedule.vue')
const Docs = () => import('@/views/Docs.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Silvia' }
  },
  {
    path: '/session/:sessionIds',
    name: 'Session',
    component: Session,
    meta: { title: 'Session' },
    props: true
  },
  {
    path: '/sessions',
    name: 'Sessions',
    component: Sessions,
    meta: { title: 'Sessions' }
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
    meta: { title: 'Info' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: 'Settings' }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { title: 'Schedule' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: 'About Silvia' }
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
    meta: { title: 'Documentation' }
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
