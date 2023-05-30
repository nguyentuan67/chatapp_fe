<template>
  <v-navigation-drawer
    permanent
    width="350"
  >
    <ChatContact />
  </v-navigation-drawer>
  <v-main>
    <Conversation v-if="isChatDetail"/>
    <div v-if="isChatDefault">
      Default chat page
    </div>
  </v-main>
</template>

<script>
import ChatContact from '../components/ChatContact.vue';
import Conversation from '../components/Conversation.vue';
export default {
  name: "ChatPage",
  components: {
    ChatContact,
    Conversation
  },
  data() {
    return {

    }
  },
  computed: {
    isChatDefault() {
      return this.$route.path.startsWith('/chat');
    },
    isChatDetail() {
      return this.$route.path.startsWith('/chat/') && this.$route.params.username;
    }
  }
}
</script>

<style scoped>

</style>