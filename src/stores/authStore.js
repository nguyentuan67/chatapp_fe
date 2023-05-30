import ApiService from "../services/api.service"
import { defineStore } from "pinia"
import router from "../router";
import { statusCode } from "../constants";

export const authStore = defineStore({
  id: "auth",
  state: () => ({
    authUser: localStorage.getItem("userInfo"),
  }),
  actions: {
    async searchUser(name) {
      const res = await ApiService.get("api/user/search", {
        params: {
          name
        }
      })
      return res.data;
    },

    async login(username, password) {
      const res = await ApiService.post("api/auth/login", {
        username,
        password
      });
      if (res.data.statusCode == statusCode.SUCCESS) {
        const userInfo = res.data.output;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        router.push("/chat")
      }
      return res.data;
    }
  }
})