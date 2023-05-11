<template>
  <div :class="{signup : signup}" class="login-form">
    <div class="login-left">
      <v-carousel 
        :continuous="true"
        :show-arrows="false"
        :cycle="true"
        interval="6000"
        hide-delimiters
      >
        <v-carousel-item selected-class="slide-active">
          <div class="animation-wrap">
            <lottie-player class="img-animation" src="https://assets6.lottiefiles.com/packages/lf20_QpolL2.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
            <h2 class="animation-title">connect anytime conveniently and easy</h2>
          </div>
        </v-carousel-item>
        <v-carousel-item selected-class="slide-active">
          <div class="animation-wrap">
            <lottie-player class="img-animation" src="https://assets3.lottiefiles.com/packages/lf20_v0zvkuxi.json" style="width: 300px; height: 300px;" background="transparent"  speed="1" loop autoplay ></lottie-player>
            <h2 class="animation-title">The place to start interesting and funny stories</h2>
          </div>
        </v-carousel-item>
        <v-carousel-item selected-class="slide-active">
          <div class="animation-wrap">
            <lottie-player class="img-animation" src="https://assets6.lottiefiles.com/packages/lf20_fjv8qxqn.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
            <h2 class="animation-title">Easy connection all over the world</h2>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="login-right">
      <div class="login-header mb-3">
        <h2>Welcome Back!</h2>
        <p>Welcome back! Please enter your detail.</p>
      </div>
      <div class="form-wrapper">
        <v-text-field
          class="mb-3"
          label="Username"
          v-model="username"
          required
          hide-details
          :rules="usernameValid"
          variant="outlined"
          prepend-inner-icon="far fa-user"
        ></v-text-field>
        <v-text-field
          class="mb-3"
          label="Password"
          type="password"
          variant="outlined"
          v-model="password"
          hide-details
          required
          :rules="passwordValid"
          prepend-inner-icon="far fa-lock"
        >
        </v-text-field>
        <div class="d-flex justify-content-between align-items-center mb-5">
          <v-checkbox-btn
            density="compact"
            label="Remember me"
            color="secondary"
          >
          </v-checkbox-btn>
          <router-link to="/">
            Forgot password
          </router-link>
        </div>
        <v-btn variant="tonal" class="submit-btn mb-4">
          Login
        </v-btn>
        <div class="text-center">
          Don't have an account? 
          <router-link :to="{name: 'Signup'}">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      signup: false,
      usernameValid: [
        (v) => !!v || "Username không được để trống",
      ],
      passwordValid: [
        (v) => !!v || "Password không được để trống",
      ],
    }
  },
  methods: {
    change() {
      this.signup = true;
    }
  }
}
</script>

<style scoped>

.login-form.signup {
  flex-direction: row-reverse;
  transition: all 1s linear;
}
.login-form {
  display: flex;
  height: 100vh;
  transition: all 1s linear;
}
a {
  text-decoration: none;
}
.login-left {
  position: relative;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.login-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.animation-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 30px;
}
.img-animation {
  width: 320px;
  height: 320px;
  object-fit: cover;
  margin-bottom: 20px;
}

.animation-title {
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  width: 100%;
  max-width: 380px;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 0.9px;
  scale: 0.4;
  opacity: 0;
}

.slide-active .animation-title {
  animation: text-animate 6s;
  animation-delay: 0.5s;
}

@keyframes text-animate {
  0% {
    scale: 0.4;
    opacity: 0;
  }
  10% {
    scale: 1;
    opacity: 1;
  }
  90% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 0.4;
    opacity: 0.0;
  }
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-header p {
  color: #adadad;
}

.form-wrapper {
  min-width: 350px;
}
.submit-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: #fff;
  height: 44px;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 16px;
}
</style>
<style>
.v-window-x-transition-enter-active, .v-window-x-transition-leave-active, .v-window-x-reverse-transition-enter-active, .v-window-x-reverse-transition-leave-active, .v-window-y-transition-enter-active, .v-window-y-transition-leave-active, .v-window-y-reverse-transition-enter-active, .v-window-y-reverse-transition-leave-active {
  transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.v-field__field input {
  background-color: transparent;
}
</style>