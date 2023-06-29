<template>
  <!-- Header message -->
  <div class="wrapper">
    <div class="header">
      <div>
        <div class="name">{{ convUser.fullName }}</div>
        <!-- <div class="info">
          67 members, 12 online
        </div> -->
        <div class="info">
          online
        </div>
      </div>
      <div class="d-flex align-items-center">
        <v-btn
          class="icon"
          size="x-small"
          variant="text"
          icon="fal fa-search"
        >
        </v-btn>
        <v-btn
          class="icon"
          size="x-small"
          variant="text"
          icon="fal fa-phone-alt"
        >
        </v-btn>
        <v-btn
          class="icon"
          size="x-small"
          variant="text"
          icon="fal fa-info-circle"
        >
        </v-btn>
      </div>
    </div>
    <!-- Body message -->
    <div class="body">
      <div v-if="isFirstChat">
        <p>Bắt đầu cuộc trò chuyện nào</p>
      </div>
      <template v-else>
        <div class="conversation-reverse">
          <div class="conversation-wrap">
            <div 
              v-for="message in listMessage"
              :key="message.id"
              class="message-wrap"
            >
              <div v-if="message.user.id == userId" class="message-content self-message">
                <p>{{message.content}}</p>
              </div>
              <div v-else class="message-content other-message">
                <p>{{message.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- Bottom message -->
    <div class="footer">
      <div class="d-flex align-items-center flex-grow-1">
        <v-btn
          class="icon"
          size="x-small"
          variant="text"
          icon="far fa-paperclip"
        ></v-btn>
        <input 
          class="input-msg"
          ref="messageInput"
          v-model="message"
          type="text"
          placeholder="Write a message"
        >
        <v-btn
          class="icon micro"
          size="small"
          variant="text"
          icon="fal fa-microphone"
        ></v-btn>
        <v-btn
          class="icon send"
          size="small"
          variant="text"
          @click="sendMessage"
          icon="fal fa-paper-plane"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { authStore } from "../stores/authStore";
import { chatStore } from "../stores/chatStore";
import { socketStore } from "../stores/socketStore";
export default {
  data() {
    return {
      message: "",
      userId: null,
      convInfo: reactive({}),
      convUser: reactive({}),
      offset: 0,
      listMessage: [],
      isFirstChat: false
    }
  },
  computed: {
    convUserId() {
      return this.$route.params.userId;
    }
  },
  methods: {
    sendMessage() {
      const newMessage = {
        user: {
          id: this.userId
        },
        content: this.message,
        convId: this.convInfo.id
      }
      socketStore().sendMessage(this.message, this.convInfo.id, this.userId, this.convUserId)
      this.listMessage.unshift(newMessage)
      this.message = "";
      this.$refs.messageInput.focus();
    },
    async getInfoConversation() {
      const res = await authStore().getUserById(this.convUserId);
      if (res.output != null) {
        this.convUser = {...res.output};
        const convRes = await chatStore().getConversation(res.output.id);
        const convOutput = convRes.output
        if(convOutput != null) {
          this.isFirstChat = false;
          this.convInfo.id = convOutput.id;
          this.convInfo.type = convOutput.type
          this.getMessages();
        } else {
          this.isFirstChat = true;
        }
      }
    },
    async getMessages() {
      const res = await chatStore().getMessages(this.convInfo.id, this.offset)
      if(res.output != null) {
        this.listMessage = this.listMessage.concat(res.output);
        this.offset++;
      }
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).id
    this.getInfoConversation();
  },
  mounted() {
    const _this = this;
    this.$refs.messageInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
      _this.sendMessage()
    }
});
  },
  watch: {
    convUserId() {
      this.getInfoConversation();
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
}
.header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}
.header .name {
  font-weight: 500;
  color: var(--text-color-active);
}
.header .info {
  font-size: 14px;
  color: var(--text-color);
}
.header .icon {
  color: var(--text-color);
  font-size: 12px;
  margin-left: 8px;
}
.header .icon:hover {
  color: var(--text-color-active);
}

.body {
  overflow-y: auto;
  height: calc(100vh - 78px - 64px);
  padding: 0 12px;
  flex: 1;
}

.conversation-reverse {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.conversation-wrap {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.message-content {
  padding: 5px 12px;
  border-radius: 12px;
  background-color: var(--background-component);
  float: left;
  margin-bottom: 4px;
  color: var(--text-color-active);
}
.message-content p {
  margin: 0;
}

.message-content.self-message {
  background-color: var(--primary-color);
  float: right;
  color: #fff;
}

.footer {
  padding: 12px 0;
  display: flex;
  width: 100%;
}
.input-msg {
  flex: 1;
  border: none;
  outline: none;
  background-color: var(--background-component);
  padding: 8px 14px;
  border-radius: 99px;
  font-size: 15px;
  color: var(--text-color-active);
}
.input-msg::placeholder {
  color: var(--sub-text-color);
}
.icon.send {
  display: none;
}
.input-msg:not(:placeholder-shown) ~ .icon.micro {
  display: none;
}
.input-msg:not(:placeholder-shown) ~ .icon.send {
  display: inline-grid;
}
.footer .icon {
  color: var(--primary-color);
  font-size: 14px;
  margin: 0 6px;
}
</style>