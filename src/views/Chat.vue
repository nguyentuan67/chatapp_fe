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
import { socketStore } from "../stores/socketStore"

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
      return this.$route.path.startsWith('/chat/') && this.$route.params.userId;
    },
    jwtToken() {
      return authStore().jwtToken;
    },
  },
  methods: {
  },
  mounted() {
    if (!socketStore().isConnected && this.jwtToken)
    socketStore().connect()
  }
}
</script>

<style scoped>

</style>