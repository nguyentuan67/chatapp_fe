<template>
  <div class="px-2">
    <div class="px-2"><Search /></div>
    <div class="list-contact">
      <div v-for="contact in listContact">
        <Contact
          :contact="contact"
          :key="contact.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
import Contact from './Contact.vue';
export default {
  name: "ChatContact",
  components: {
    Search,
    Contact,
  },
  props: {
    listContact: { type: Array }
  },
  data() {
  },
}
</script>