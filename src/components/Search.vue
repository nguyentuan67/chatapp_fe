<template>
  <div class="wrapper">
    <div class="search-icon">
      <i class="fal fa-search"></i>
    </div>
    <input v-model="name" @input="debounceSearch" type="text" placeholder="Search">
    <div v-if="name != ''" class="search-result">
      <div v-if="searchUsers.length != 0" v-for="user in searchUsers" class="item-wrap">
        <router-link 
          class="d-flex align-items-center search-item"
          :to="{name: 'ChatDetail', params: { username: user.username }}"
        >
          <v-avatar
            :image="user.avatarUrl"
            size="36"
          ></v-avatar>
          <div class="ms-3">
            <p class="mb-0">{{ user.firstName + " " + user.lastName }}</p>
            <p class="mb-0">{{ "@" + user.username }}</p>
          </div>
        </router-link>
      </div>
      <div v-if="searchUsers.length == 0">
        <p class="mb-0 text-center">Không tìm thấy người dùng nào</p>
      </div>
    </div>
  </div>
</template>
<script>
import { authStore } from '../stores/authStore';
import debounce from '../utils/debounce';
export default {
  name: "SearchComp",
  data() {
    return {
      name: "",
      searchUsers: [],
    }
  },
  methods: {
    async searchUser() {
      
    },
    debounceSearch: debounce(async function() {
      if(this.name != "") {
        const res = await authStore().searchUser(this.name);
        console.log(res)
        this.searchUsers = res.output;
      }
    }, 500)
  },
}
</script>
<style scoped>
.wrapper{
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 6px 8px;
  display: flex;
  border-radius: 8px;
  background-color: var(--background-component);
  margin: 12px 0;
}
.search-icon {
  height: 100%;
  padding: 0 4px;
  color: var(--text-color);
  cursor: pointer;
}
input {
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  margin-left: 4px;
  color: var(--text-color-active);
}
.search-item {
  background-color: var(--black-white-color);
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-color-active);
  text-decoration: none;
}
.search-item:hover {
  background-color: var(--background-component);
}
.item-wrap:not(:last-of-type) {
  border-bottom: 1px solid var(--border-color);
}
.search-result {
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: 100%;
  z-index: 2;
  background-color: var(--black-white-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 6px 4px;
  max-height: calc(100vh - 100px);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>