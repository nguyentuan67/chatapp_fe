<template>
  <router-link :to="{name: 'Home'}" class="d-block text-center">
    <v-avatar
      image="https://api.multiavatar.com/Starcrasher.png"
      color="grey-darken-1"
      :size="46"
      class="mx-auto mt-4"
      @click=""
    ></v-avatar>
  </router-link>
  <div class="d-flex flex-grow-1 flex-column">
    <v-list class="list-nav mt-4">
      <v-list-item
        v-for="item in topItems" :key="item.title"
        active-class="nav-active"
        class="nav-item"
        :to="item.path"
      >
        <i class="nav-icon"  :class="item.icon"></i>
        <span class="nav-title">{{ item.title }}</span>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <v-list class="list-nav">
      <v-list-item
        v-for="item in botItems" :key="item.title"
        active-class="nav-active"
        class="nav-item"
        :to="item.path"
      >
        <i class="nav-icon"  :class="item.icon"></i>
        <span class="nav-title">{{ item.title }}</span>
      </v-list-item>
      <v-list-item
        active-class="nav-active"
        class="nav-item"
        @click="logout"
      >
        <i class="nav-icon fal fa-sign-out"></i>
        <span class="nav-title">Logout</span>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { authStore } from '../stores/authStore';
export default {
  name: "LeftBar",
  data() {
    return {
      topItems: [
        {title: "Chats", icon: "far fa-comment", path: {name: "ChatDefault"}},
        {title: "Friends", icon: "fal fa-user-friends", path: {name: "Home"}},
        {title: "Friends", icon: "fal fa-user-friends", path: {name: "Home"}},
        {title: "Friends", icon: "fal fa-user-friends", path: {name: "Home"}},
      ],
      botItems: [
        {title: "Setting", icon: "fal fa-cog", path: {name: "Home"}},
      ],
    }
  },
  methods: {
    logout() {
      authStore().logout()
    }
  }
}
</script>

<style scoped>
.nav-icon {
  font-size: 24px;
}
.nav-title {
  display: block;
  font-size: 12px;
}
.nav-item {
  position: relative;
  padding: 4px !important;
  min-height: 66px !important;
  text-align: center;
  color: var(--text-color) !important;
  transition: width ease-in 0.5s;
}
.nav-item::before {
  content: "";
  position: absolute;
  display: block;
  right: -3px;
  height: 100%;
  width: 0px;
  background-color: rgba(41, 95, 194, 0.04) !important;
  border-left: 3px solid var(--primary-color);
  transition: width ease-out 0.5s;
  z-index: 1;
}
.nav-item:hover {
  color: var(--primary-color) !important;
  background-color: transparent;
}
.nav-item:hover:not(.nav-active)::before {
  width: 100%;
  right: 0;
}
.nav-active {
  color: var(--primary-color) !important;
}
.nav-active.nav-item::before {
  width: 100%;
  right: 0;
}
.nav-item .v-list-item__overlay {
  background-color: transparent !important;
}
</style>
<style>
</style>