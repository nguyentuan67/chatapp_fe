import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "../stores/authStore";

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiredAuth: false,
      layout: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiredAuth: false,
      layout: false,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      requiredAuth: false,
      layout: false,
    },
  },
  {
    path: "/chat",
    name: "ChatDefault",
    component: () => import("../views/Chat.vue"),
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/chat/:userId",
    name: "ChatDetail",
    component: () => import("../views/Chat.vue"),
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Login" && !authStore().checkTokenExpired()) {
    next({name: "ChatDefault"})
  } else if (to.meta.requiredAuth && authStore().checkTokenExpired()) {
    next({ name: 'Login' })
  } else {
    next();
  }
});

export default router