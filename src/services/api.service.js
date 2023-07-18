import axios from "axios";
import router from "../router";

let BASE_URL = import.meta.env.VITE_APP_ROOT_BE;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "*/*"
  },
})

instance.interceptors.request.use((config) => {
  let jwtToken = localStorage.getItem("token") || ""
  if(jwtToken) {
    config.headers["Authorization"] = "Bearer " + jwtToken;
  }
  return config;
},
(error) => {
  // Nếu có lỗi, trả về một Promise bị từ chối
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data.status == 500 || response.data.statusCode == 500) {
      router.push("/error/500");;
    }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    // Nếu không xác thực, xóa mã jwt và chuyển hướng người dùng về trang đăng nhập
    if (status === 401) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token")
      router.push("/login");
    }
    throw new Error(error.response ? error.response.data : error.message);
  }
)

export default instance;