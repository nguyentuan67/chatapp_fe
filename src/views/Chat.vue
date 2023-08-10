<template>
  <v-navigation-drawer
    class="list-contact"
    permanent
    width="350"
  >
    <ChatContact :list-contact="listConversation"/>
  </v-navigation-drawer>
  <v-main>
    <Conversation 
      v-if="isChatDetail" 
      :list-message="listMessage"
      :conv-id-prop="currentConvId"
      @get-messages="getMessage"
      @update-message="updateMessage"
      @send-message="sendMessage"
      @getConversation="convId => currentConvId = convId"
      @getConvUser="convUser => currentConvUser = convUser"
    />
    <div v-else class="text-default flex-center">
      Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
    </div>
  </v-main>
</template>

<script>
import { ref } from 'vue';
import ChatContact from '../components/ChatContact.vue';
import Conversation from '../components/Conversation.vue';
import { authStore } from "../stores/authStore";
import { chatStore } from '../stores/chatStore';

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
      listConversation: ref([]),
      currentConvUser: null,
      currentConvId: null,
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
    sendMessage(message, conversationId, userId) {
      const chatMessage = { 
        'conversationId': conversationId,
        'userId': userId,
        'content': message,
      };
      this.stompClient.send(`/app/chat/user/${this.currentConvUser.id}`, {}, JSON.stringify(chatMessage));
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
      console.log(chatMessage);
      if (chatMessage.convId == this.currentConvId || chatMessage.user.id == this.currentConvUser.id) {
        this.listMessage.unshift(chatMessage)
      }
      this.updateConversations(chatMessage)
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
      this.listMessage = this.listMessage.concat(message)
    },
    async getConversations() {
      const res = await chatStore().getConversations();
      this.listConversation = res.output
      console.log(this.listConversation);
    },
    updateConversations(message, convMsg) {
      const index = this.listConversation.findIndex(conversation => conversation.id == message.convId)
      //create new conversation
      if(index == -1) {
        this.currentConvId = message.convId;
        const newConv = {
          id: message.convId,
          name: null,
          avatarUrl: null,
          type: 1,
          lastMessage: message,
          users: [
            message.user,
            this.currentConvUser,
          ]
        }
        this.listConversation.unshift(newConv)
      } else {
        this.listConversation[index].lastMessage = {...message}
        if (index != 0) {
          this.listConversation.sort((a, b) => b.lastMessage.time.localeCompare(a.lastMessage.time))
        }
      }
    },
    addConversation(conversation) {

    },
  },
  mounted() {
    this.connect()
  },
  created() {
    this.getConversations();
  }
}
</script>

<style scoped>
.text-default {
  height: 100%;
  font-weight: 700;
  font-size: 20px;
  color: var(--text-color);
  margin: 0 12px;
  text-align: center;
}
</style>