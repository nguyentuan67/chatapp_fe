<template>
  <div class="px-2">
    <div class="px-2"><Search /></div>
    <div class="list-contact">
      <Contact />
      <Contact />
      <Contact />
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
  data() {
    return {

    }
  }
}
</script>