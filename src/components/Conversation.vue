<template>
  <!-- Header message -->
  <div class="wrapper">
    <div class="header">
      <div>
        <div class="name">Office Chat</div>
        <div class="info">
          67 members, 12 online
        </div>
        <!-- <div class="info">
          online
        </div> -->
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
    <div class="body flex-grow-1" style="padding: 0 12px;">

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
        <input class="input-msg" type="text" placeholder="Write a message">
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
          icon="fal fa-paper-plane"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

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