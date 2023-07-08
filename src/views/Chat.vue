<template>
  <v-navigation-drawer
    permanent
    width="350"
  >
    <ChatContact />
  </v-navigation-drawer>
  <v-main>
    <Conversation 
      v-if="isChatDetail" 
      :list-message="listMessage"
      @get-messages="getMessage"
      @update-message="updateMessage"
      @send-message="sendMessage"
    />
    <div v-else>
      Default chat page
    </div>
  </v-main>
</template>

<script>
import { ref } from 'vue';
import ChatContact from '../components/ChatContact.vue';
import Conversation from '../components/Conversation.vue';
import { authStore } from "../stores/authStore";

export default {
  name: "ChatPage",
  components: {
    ChatContact,
    Conversation
  },
  data() {
    return {
      connection: null,
      stompClient: null,
      listMessage: ref([]),
      isConnected: false,
      stompClient: null,
    }
  },
  computed: {
    isChatDetail() {
      return this.$route.path.startsWith('/chat/') && this.$route.params.userId;
    },
    jwtToken() {
      return authStore().jwtToken;
    },
  },
  methods: {
    connect() {
      const userId = JSON.parse(localStorage.getItem('userInfo')).id
      const socket = new SockJS('https://localhost:8443/ws')
      this.stompClient = Stomp.over(socket)
      const ctx = this
      this.stompClient.connect({}, (frame) => {
        console.log('Connected: ', frame)
        ctx.stompClient.subscribe(`/topic/user/${userId}`, function (output) {
          ctx.handleMessage(output.body)
        })
      }, (message) => {
        console.log('Disconnect! Retrying connection...');
        this.connect();
      })
      this.isConnected = true;
    },
    sendMessage(message, conversationId, userId, convUserId) {
      const chatMessage = { 
        'conversationId': conversationId,
        'userId': userId,
        'content': message,
      };
      this.stompClient.send(`/app/chat/user/${convUserId}`, {}, JSON.stringify(chatMessage));
    },
    disconnect () {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        this.handleMessage('Disconnected')
      } else {
        console.log('Connect first')
      }
    },
    handleMessage(msg) {
      const chatMessage = JSON.parse(msg);
      this.listMessage.unshift(chatMessage)
    },
    subscribeToConversation(userId) {
      this.activeSubscriptions.push({ id: userId, sub: this.stompClient.subscribe(`/topic/user/${userId}`, (message) => {
        const messageObj = JSON.parse(message.body);
        this.handleReceivedMessage(messageObj, conv.id);
      })});
    },
    getMessage(messages) {
      this.listMessage = [...messages]
    },
    updateMessage(message) {
      this.listMessage = this.listMessage.concat(messages)
    }
  },
  mounted() {
    this.connect()
  }
}
</script>

<style scoped>

</style>