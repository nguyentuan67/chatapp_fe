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
    },
    async createConversation(listUserId) {
      const res = await ApiService.post("/chat/conversation", {
        listUserId
      })
      return res.data
    },
    async getMessages(convId, offset) {
      const res = await ApiService.get(`/chat/${convId}/message`, {
        params: {offset}
      });
      return res.data;
    }
  }
})