<template>
  <!-- <div class="wrapper"> -->
    <router-link class="wrapper" :to="contact.type == 1 ? '/chat/'+userContact.id : '/chat/'+contact.id">
      <v-avatar
        :image="contact.avatarUrl || userContact.avatarUrl"
        size="46"
      ></v-avatar>
      <div class="contact-body">
        <div class="d-flex align-items-center justify-content-between">
          <div class="name">{{ contact.name || userContact.fullName }}</div>
          <!-- <div class="info">
            <i class="fal fa-check" style="margin-right: -6px;"></i>
            <i class="fal fa-check"></i>
            <span class="ms-2">4m</span>
          </div> -->
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div class="msg" v-if="contact.lastMessage.user.id != userId">
            {{contact.lastMessage.user.fullName + ": " +  contact.lastMessage.content}}
          </div>
          <div class="msg" v-else>{{ "Bạn: "+ contact.lastMessage.content }}</div>
          <!-- <div class="info">
            <span class="count flex-center">5</span>
            <i class="fas fa-thumbtack me-1" style="transform: rotate(40deg); margin-bottom: -4px;"></i>
          </div> -->
        </div>
      </div>
    </router-link>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    contact: { type: Object }
  },
  data() {
    return {
      userId: JSON.parse(localStorage.getItem('userInfo')).id,
      userContact: null
    }
  },
  methods: {
  },
  created() {
    this.contact.type == 1 ? this.userContact = this.contact.users.find(user => user.id != this.userId) : null
  }
}
</script>
<style scoped>
.contact-body {
  margin-left: 12px;
  flex: 1;
}
.wrapper {
  display: block;
  padding: 15px 10px;
  border-radius: 18px;
  margin-bottom: 6px;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  text-decoration: none;
}
.wrapper:hover, .wrapper.active {
  background-color: var(--background-component);
}
.name {
  font-weight: 500;
  color: var(--text-color-active);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.msg {
  margin-top: 4px;
  font-size: 14px;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info {
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 14px;
  margin-left: 8px;
}
.count {
  font-size: 13px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6b8afd;
  margin-right: 8px;
  color: #fff;
}
</style>