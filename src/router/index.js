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
    name: "ChatPage",
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

router.beforeEach(async(to) => {
  if (to.path == "/login" && authStore.authUser) {
    router.push("/chat");
  }
  if (to.meta.requiredAuth && !authStore().authUser) {
    router.push("/login");
  }
});

export default router