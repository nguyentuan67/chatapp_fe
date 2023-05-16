<template>
  <v-navigation-drawer
    permanent
    width="350"
  >
    <ChatContact />
  </v-navigation-drawer>
  <v-main>
    <Message />
  </v-main>
</template>

<script>
import ChatContact from '../components/ChatContact.vue';
import Message from '../components/Message.vue';
export default {
  name: "ChatPage",
  components: {
    ChatContact,
    Message
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>