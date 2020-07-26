import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//如果要在router中使用store，需要引入store
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: "/popup",
    component: () => import("@/components/popup/index.vue")
  },
  {
    path: "*",
    component: () => import("@/views/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == "/home") {
    store.commit("changeShowpopup", false);
  }
  next();
})

export default router
