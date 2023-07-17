import ApiService from "../services/api.service"
import { defineStore } from "pinia"
import router from "../router";
import { statusCode } from "../constants";
import jwtDecode from "jwt-decode"

export const authStore = defineStore({
  id: "auth",
  state: () => ({
    authUser: localStorage.getItem("userInfo"),
    jwtToken: localStorage.getItem("token"),
  }),
  actions: {
    async searchUser(name) {
      const res = await ApiService.get("/user/search", {
        params: {
          name
        }
      })
      return res.data;
    },
    async getUserById(userId) {
      const res = await ApiService.get("/user", {
        params: {
          id: userId
        }
      })
      return res.data;
    },
    async login(username, password) {
      const res = await ApiService.post("/auth/login", {
        username,
        password
      });
      if (res.data.statusCode == statusCode.SUCCESS) {
        const userInfo = res.data.output;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("token", userInfo.jwtToken);
        router.push("/chat")
      }
      return res.data;
    },
    checkTokenExpired() {
      try {
        const decodedToken = jwtDecode(this.jwtToken);
        const currentTime = Date.now() / 1000;
    
        return decodedToken.exp < currentTime;
      } catch (error) {
        return true; // Nếu có lỗi khi giải mã token, coi như token đã hết hạn
      }
    }
  }
})