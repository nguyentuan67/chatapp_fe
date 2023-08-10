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
      <div v-if="listMessage.length == 0">
        <p>Bắt đầu cuộc trò chuyện nào</p>
      </div>
      <template v-else>
        <div class="conversation-wrap" ref="conversation" @scroll="loadMessage">
          <div class="conversation-reverse">
            <div 
              v-for="message in listMessage"
              :key="message.id"
              class="message-wrap"
            >
              <div class="message-item self-message" v-if="message.user.id == userId">
                <p class="message-content">{{message.content}}</p>
              </div>
              <div v-else class="message-item other-message">
                <img :src="message.user.avatarUrl" alt="">
                <div class="message-content">{{message.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- Bottom message -->
    <div class="footer">
      <v-btn
        class="icon"
        size="x-small"
        variant="text"
        icon="far fa-paperclip"
      ></v-btn>
      <div class="input-wrap">
        <input 
        class="input-msg"
        ref="messageInput"
        v-model="message"
        type="text"
        placeholder="Write a message"
        >
        <EmojiPicker
          v-show="showEmojis"
          class="emoji-picker"
          @emoji_click="handleEmojiClick"
        />
        <v-btn
          class="icon"
          size="x-small"
          variant="text"
          icon="fal fa-laugh"
          @click="showEmojis = !showEmojis"
        ></v-btn>
      </div>
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
</template>

<script>
import { reactive } from "vue";
import { authStore } from "../stores/authStore";
import { chatStore } from "../stores/chatStore";
import EmojiPicker from "./EmojiPicker/EmojiPicker.vue";
export default {
  props: {
    listMessage: { type: Array, require: true}
  },
  emits: ["getMessages", "sendMessage", "updateMessage", "getConversation"],
  components: {
    EmojiPicker
  },
  data() {
    return {
      message: "",
      userId: null,
      convInfo: reactive({}),
      convUser: reactive({}),
      offset: 0,
      showEmojis: false,
      isFetching: false,
      hasMoreMessages: true,
    }
  },
  computed: {
    convUserId() {
      return this.$route.params.userId;
    }
  },
  methods: {
    async sendMessage() {
      if (this.convInfo.id == null) {
        const listUserId = [this.convUserId, this.userId]
        const res = await chatStore().createConversation(listUserId);
        this.convInfo.id = res.output.id
        this.$emit("getConversation", this.convInfo.id)
      }
      this.$emit("sendMessage", this.message, this.convInfo.id, this.userId, this.convUser)
      this.message = "";
      this.$refs.messageInput.focus();
    },
    async getInfoConversation() {
      const res = await authStore().getUserById(this.convUserId);
      if (res.output != null) {
        this.convUser = {...res.output};
        const convRes = await chatStore().getConversation(res.output.id);
        const convOutput = convRes.output
        this.offset = 0;
        this.hasMoreMessages = true;
        this.$emit("getMessages", []) 
        if(convOutput != null) {
          this.$emit("getConversation", convOutput.id)
          this.convInfo.id = convOutput.id;
          this.convInfo.type = convOutput.type
          this.getMessages();
        }
      }
    },
    async getMessages() {
      this.isFetching = true;
      const res = await chatStore().getMessages(this.convInfo.id, this.offset)
      if(res.output != null) {
        this.offset == 0 ?
        this.$emit("getMessages", res.output) :
        this.$emit("updateMessage", res.output)
        this.offset++;
      } else {
        this.hasMoreMessages = false;
      }
      this.isFetching = false
    },
    loadMessage() {
      const conversation = this.$refs.conversation;
      let scrollPosition = conversation.scrollHeight - conversation.clientHeight;
      if (scrollPosition == -conversation.scrollTop && !this.isFetching && this.hasMoreMessages) {
        this.getMessages();
      }
    },
    handleEmojiClick(emoji) {
      this.message += emoji
      this.$refs.messageInput.focus()
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).id
    document.addEventListener("click", e => {
      const emojiPicker = document.querySelector(".emoji-picker");
      const showEmojiIcon = document.querySelector(".emoji-picker + .icon");
      if ( this.showEmojis && e.target != emojiPicker && !showEmojiIcon.contains(e.target)) {
        this.showEmojis = false
      }
    })
  },
  mounted() {
    this.getInfoConversation();
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
  height: 100%;
  flex: 1;
}

.conversation-wrap {
  height: calc(100vh - 78px - 64px);
  padding: 12px 12px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.conversation-wrap::-webkit-scrollbar {
  width: 6px;
}
.conversation-wrap::-webkit-scrollbar-track {
  background: var(--background-component); 
}
.conversation-wrap::-webkit-scrollbar-thumb {
  background: var(--secondary-color); 
  border-radius: 8px;
}

.conversation-reverse {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}
.message-wrap:has(.other-message) + .message-wrap .other-message img {
  visibility: hidden;
}
.message-wrap:not(.message-wrap:has(.other-message):has(+ .message-wrap .other-message)) .message-content {
  border-top-left-radius: 16px;
}
.message-wrap:not(.message-wrap:has(.self-message):has(+ .message-wrap .self-message)) .message-content {
  border-top-right-radius: 16px;
}
.message-wrap:has(.other-message) + .message-wrap:has(.self-message) .message-content {
  border-bottom-right-radius: 16px;
}
.message-wrap:has(.self-message) + .message-wrap:has(.other-message) .message-content {
  border-bottom-left-radius: 16px;
}
.message-wrap:first-child .message-content {
  border-bottom-left-radius: 16px;
}
.message-wrap:first-child .message-content {
  border-bottom-right-radius: 16px;
}
.message-wrap

.message-item.other-message {
  display: flex;
  align-items: center;
}
.message-item.other-message img {
  width: 30px;
  height: auto;
  margin: 0 5px 5px;
  display: block;
  border-radius: 50%;
}

.message-content {
  padding: 7px 12px 8px;
  border-radius: 5px;
  background-color: var(--background-component);
  float: left;
  margin-bottom: 1px;
  color: var(--text-color-active);
  font-size: 15px;
  line-height: 20px;
}
.other-message .message-content {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.self-message .message-content {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.message-content p {
  margin: 0;
}

.self-message .message-content {
  background-color: var(--primary-color);
  float: right;
  color: #fff;
}

.footer {
  padding: 12px 0;
  display: flex;
  align-items: center;
  width: 100%;
}
.input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  outline: none;
  background-color: var(--background-component);
  padding: 6px 2px 6px 14px;
  border-radius: 99px;
  height: 40px;
  position: relative;
}
.input-msg {
  font-size: 15px;
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--text-color-active);
}
.input-msg::placeholder {
  color: var(--sub-text-color);
}
.icon.send {
  display: none;
}
.footer:has(.input-wrap .input-msg:not(:placeholder-shown)) > .icon.micro {
  display: none;
}
.footer:has(.input-wrap .input-msg:not(:placeholder-shown)) > .icon.send {
  display: inline-grid;
}
.footer .icon {
  color: var(--primary-color);
  font-size: 14px;
  margin: 0 6px;
}
.emoji-picker {
  position: absolute;
  bottom: calc(100% + 20px);
  right: 0;
}
</style>