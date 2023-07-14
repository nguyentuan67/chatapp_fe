<template>
  <div class="px-2">
    <div class="px-2"><Search /></div>
    <div class="list-contact">
      <template v-for="contact in listContact">
        <Contact
          :contact="contact"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import Search from './Search.vue';
import Contact from './Contact.vue';
import { chatStore } from "../stores/chatStore";
export default {
  name: "ChatContact",
  components: {
    Search,
    Contact,
  },
  data() {
    return {
      listContact: reactive([]),
    }
  },
  methods: {
    async getConversations() {
      const res = await chatStore().getConversations();
      this.listContact = [...res.output]
      console.log(this.listContact);
    }
  },
  created() {
    this.getConversations();
    const store = chatStore();
    const unsubscribe = store.$subscribe((mutation, state) => {
      // Xử lý trạng thái mới tại đây
      // console.log('New state:', state);
      this.listContact = state.listConversation
    });
  }
}
</script>