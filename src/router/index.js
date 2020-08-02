import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//如果要在router中使用store，需要引入store
import store from "@/store"
import { Toast } from 'vant'
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
    children: [
      {
        path: 'popup',
        component: () => import('@/components/popup/Index.vue')
      }
    ],
    meta: {
      num: 0
    }
  },
  {
    path: "/topic",
    component: () => import("@/views/Topic.vue"),
    meta: {
      num: 1
    }
  },
  {
    path: "/category",
    component: () => import("@/views/Category.vue"),
    meta: {
      num: 2
    },
    children: [
      {
        path: 'popup',
        component: () => import('@/components/popup/Index.vue')
      }
    ]
  },
  {
    path: "/cart",
    component: () => import("@/views/Cart.vue"),
    meta: {
      num: 3
    }
  },
  {
    path: "/user",
    component: () => import("@/views/User.vue"),
    meta: {
      num: 4
    }
  },
  {
    path: "/channel/:id",
    component: () => import("@/views/ChannelPage.vue")
  },
  {
    path: "/productdetail/:id?",
    component: () => import("@/views/ProductDetail.vue")
  },
  {
    path: "/manufacturer/:id?",
    component: () => import("@/components/Manufacturer.vue")
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
  // 去购物车页面，如果没有token，统一跳到用户页
  if (to.path == "/cart") {
    let token = localStorage.getItem("token");
    if (token) {
      next();
      return;
    } else {
      Toast("请先登录");
      setTimeout(() => {
        next("/user")
      }, 2000);
      return;
    }
  }
  next();
})

export default router
