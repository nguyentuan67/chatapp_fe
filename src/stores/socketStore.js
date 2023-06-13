import { defineStore } from "pinia";
import Stomp from 'webstomp-client';
import { webSocketDev } from '../constants';

export const socketStore = defineStore({
  id: "socket",
  state: () => ({
    isConnected: false,
    stompClient: null
  }),
  actions: {
    connect() {
      const socket = new SockJS('https://localhost:8443/ws')
      this.stompClient = Stomp.over(socket)
      const ctx = this
      this.stompClient.connect({}, function (frame) {
        console.log('Connected: ', frame)
        ctx.stompClient.subscribe('/topic/app', function (output) {
          ctx.handleMessage(output.body);
        })
      })
      this.isConnected = true;
    },
    disconnect () {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        this.handleMessage('Disconnected')
      } else {
        console.log('Connect first')
      }
    },
    handleMessage (msg) {
      this.messages.push(msg)
    }
  }
})