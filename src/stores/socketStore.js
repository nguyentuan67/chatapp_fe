import { defineStore } from "pinia";

export const socketStore = defineStore({
  id: "socket",
  state: () => ({
    isConnected: false,
    stompClient: null,
  }),
  actions: {
    connect() {
      const userId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log(this.authUserId);
      const socket = new SockJS('https://localhost:8443/ws')
      this.stompClient = Stomp.over(socket)
      const ctx = this
      this.stompClient.connect({}, function (frame) {
        console.log('Connected: ', frame)
        ctx.stompClient.subscribe(`/topic/user/${userId}`, function (output) {
        // ctx.stompClient.subscribe('/topic/updateService', function (output) {
          const chatMessage = JSON.parse(output.body);
          console.log('Received message:', chatMessage);
        })
      })
      // this.stompClient.connect({}, (frame) => {
      //   console.log(`Connected: ${frame}`);
      //   this.subscribeToAllConversations();
      //   this.listenForNewConversations();
      // }, (message) => {
      //   console.log('Disconnect! Retrying connection...');
      //   this.connectToSocket();
      // });
      this.isConnected = true;
    },
    sendMessage(message, conversationId, userId, convUserId) {
      const chatMessage = { 
        conversationId: conversationId,
        userId: userId,
        content: message,
      };
      this.stompClient.send(`/app/chat/user/${convUserId}`, {}, 
      JSON.stringify({ 'conversationId': conversationId, 'userId': userId, 'content': message }));
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
    },
    subscribeToConversation(userId) {
      this.activeSubscriptions.push({ id: userId, sub: this.stompClient.subscribe(`/topic/user/${userId}`, (message) => {
        const messageObj = JSON.parse(message.body);
        this.handleReceivedMessage(messageObj, conv.id);
      })});
    },
  }
})