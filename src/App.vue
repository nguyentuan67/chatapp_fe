<template>
  <v-app>
    <v-navigation-drawer v-if="$route.meta.layout"
      class="leftbar"
      permanent
      rail
      rail-width="76"
    >
      <LeftBar/>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
import LeftBar from './components/LeftBar.vue';
export default {
  name: "App",
  components: {
    LeftBar
  }
}
</script>

<style>
.leftbar {
  background-color: var(--leftbar-color) !important;
}
.leftbar .v-navigation-drawer__content {
  display: flex !important;
  flex-direction: column;
}
</style>
