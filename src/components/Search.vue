<template>
  <div class="wrapper">
    <div class="search-icon">
      <i class="fal fa-search"></i>
    </div>
    <input v-model="name" @input="debounceSearch" type="text" placeholder="Search">
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
    }
  },
  methods: {
    async searchUser() {
      
    },
    debounceSearch: debounce(async function() {
      if(this.name != "") {
        const res = await authStore().searchUser(this.name);
        console.log(res)
      }
    }, 500)
  },
}
</script>
<style scoped>
.wrapper{
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
</style>