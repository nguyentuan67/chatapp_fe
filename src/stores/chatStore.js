import { defineStore } from "pinia";
import ApiService from "../services/api.service"

export const chatStore = defineStore({
  id: "chatStore",
  state: () => ({
    
  }),
  actions: {
    async getConversation(userId) {
      const res = await ApiService.get("/chat/getConversation", {
        params: {
          userId
        }
      })
      return res.data
    }
  }
})