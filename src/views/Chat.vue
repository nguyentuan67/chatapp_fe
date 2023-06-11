<template>
  <v-navigation-drawer
    permanent
    width="350"
  >
    <ChatContact />
  </v-navigation-drawer>
  <v-main>
    <Conversation v-if="isChatDetail"/>
    <div v-else>
      Default chat page
    </div>
  </v-main>
</template>

<script>
import ChatContact from '../components/ChatContact.vue';
import Conversation from '../components/Conversation.vue';
import { authStore } from "../stores/authStore";
import { webSocketDev } from '../constants';
// import { state, socket } from "../stores/websocket"
// import sockjs from "sockjs-client/dist/sockjs"
// import SockJS from "sockjs-client";
import Stomp from 'webstomp-client'

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
      messages: []
    }
  },
  computed: {
    isChatDetail() {
      return this.$route.path.startsWith('/chat/') && this.$route.params.username;
    },
    jwtToken() {
      return authStore().jwtToken;
    },
  },
  methods: {
    connect () {
      const socket = new SockJS('https://localhost:8443/ws')
      this.stompClient = Stomp.over(socket)
      const ctx = this
      this.stompClient.connect({}, function (frame) {
        console.log('Connected: ', frame)
        // ctx.handleMessage('Connected: ', frame)
        ctx.stompClient.subscribe('/topic/app', function (output) {
          ctx.handleMessage(output.body)
        })
      })
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
  },
  created() {
    this.connect()
  },
}
</script>

<style scoped>

</style>