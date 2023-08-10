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
    async signup(username, firstName, lastName, password, gender, fileAvatar) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("password", password);
      formData.append("gender", gender ? true : false);
      formData.append("avatar", fileAvatar)
      const res = await ApiService.post("/auth/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res);
      return res.data;
    },
    logout() {
      this.jwtToken = null
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
      router.push("/login")
    },
    checkTokenExpired() {
      try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const currentTime = Date.now() / 1000;
    
        return decodedToken.exp < currentTime;
      } catch (error) {
        return true; // Nếu có lỗi khi giải mã token, coi như token đã hết hạn
      }
    }
  }
})