<template>
  <v-navigation-drawer
    permanent
    width="350"
  >
    <div class="px-3">
      <Search />
      <div class="list-contact">
        <Contact />
      </div>
    </div>
  </v-navigation-drawer>
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