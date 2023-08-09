<template>
  <div class="wrapper flex-center">
    <div class="form-wrap">
      <div class="form-header">
        <h2>Create an account!</h2>
        <p>Welcome back! Please enter your detail.</p>
      </div>
      <div class="form-body">
        <v-form ref="form">
          <v-text-field
            class="mb-2"
            label="Username"
            v-model="username"
            required
            :rules="usernameValid"
            variant="outlined"
            :error-messages="errMsg"
            prepend-inner-icon="far fa-user"
          ></v-text-field>
          <div class="d-flex">
            <v-text-field
              class="mb-2 me-2"
              label="First Name"
              v-model="firstName"
              required
              :rules="usernameValid"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="mb-2 ms-2"
              label="Last Name"
              v-model="lastName"
              required
              :rules="usernameValid"
              variant="outlined"
            ></v-text-field>
          </div>
          <v-text-field
            class="mb-2"
            label="Password"
            type="password"
            variant="outlined"
            v-model="password"
            required
            :rules="passwordValid"
            prepend-inner-icon="far fa-lock"
          >
          </v-text-field>
          <v-radio-group
            v-model="gender"
            inline
          >
            <v-radio
              class="me-3"
              label="Male"
              value= 1
            ></v-radio>
            <v-radio
              label="Female"
              value= 0
            ></v-radio>
          </v-radio-group>
        </v-form>
        <!-- <div @click="openModel = true" class="select-avt mb-3">
          Select an avatar
        </div> -->
        <v-btn :loading="loading" variant="tonal" class="submit-btn mb-2" @click="signup">
          Sign up
        </v-btn>
        <div class="text-center">
          Have an account? 
          <router-link :to="{name: 'Login'}">Login</router-link>
        </div>
      </div>
      <div class="model" :class="{open: openModel}">
        <div class="list-avatar">
          <div class="avatar-item" v-for="(avatar, i) in listAvatar" :key="i">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '../stores/authStore'
import { statusCode } from '../constants'
import router from "../router";
export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      openModel: false,
      gender: "1",
      usernameValid: [
        (v) => !!v || "Is required",

      ],
      nameValid: [v => !!v || "Is required"],
      passwordValid: [
        (v) => !!v || "Password không được để trống",
      ],
      listAvatar: [],
      baseUrl: "https://api.multiavatar.com/",
      loading: false,
      errMsg: ""
    }
  },
  methods: {
    async signup() {
      const formValid = await this.$refs.form.validate();
      if (formValid.valid) {
        this.loading = true
        const res = await authStore().signup(this.username, this.firstName, this.lastName, this.password, this.gender);
        this.loading = false  
        if(res.statusCode == statusCode.BAD_REQUEST) {
          this.errMsg = res.error
        } else if (res.statusCode == statusCode.SUCCESS) {
          router.push("/login") 
        }
      }
    },
    async getRandomAvatars() {
      for(let i = 1; i < 13; i++) {
        let avatar = await this.baseUrl + Math.floor(Math.random() * 10000) + ".png"
        this.listAvatar.push(avatar)
      }
      console.log(this.listAvatar);
    }
  },
  created() {
    // this.getRandomAvatars()
  }
}
</script>
<style scoped>
.wrapper {
  height: 100vh;
  background-image: url("../assets/dev-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.form-wrap {
  min-width: 450px;
  box-shadow: 2px 2px 10px #333;
  padding: 32px 36px;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 34px;
  position: relative;
  overflow: hidden;
}
.model {
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  transition: all linear 0.6s;
  padding: 40px 36px;
}
.model.open {
  top: 0;
  opacity: 1;
}
.form-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-header p {
  color: #adadad;
}
.select-avt {
  display: inline-block;
  border-radius: 6px;
  font-weight: 600;
  color: var(--text-color);
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  cursor: pointer;
}
.submit-btn {
  width: 100%;
  background-color: var(--primary-color);
  height: 50px !important;
  color: #fff;
  height: 44px;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 18px;
}
.list-avatar {
  display: flex;
  flex-wrap: wrap;
}
</style>