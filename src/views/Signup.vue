<template>
  <div class="wrapper flex-center">
    <div class="form-wrap">
      <div class="form-signup">
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
          <v-btn :loading="loading" variant="tonal" class="submit-btn mb-2" @click="validateForm">
            Sign up
          </v-btn>
          <div class="text-center">
            Have an account? 
            <router-link :to="{name: 'Login'}">Login</router-link>
          </div>
        </div>
      </div>
      <div class="form-avatar" :class="{open: openModel}">
        <div class="form-header">
          <h2>Setup your avatar</h2>
          <p>Welcome back! Please enter your detail.</p>
        </div>
        <div>
          <div class="avatar-wrap">
            <div class="mask-avatar" :style="{backgroundImage: bgImage}"></div>
            <div class="avatar" :style="{backgroundImage: bgImage}"></div>
          </div>
          <input @change="uploadFile" type="file" name="avatar" id="avatar" hidden accept="image/png, image/gif, image/jpeg">
          <label class="label-avatar" for="avatar">Upload image</label>
          <div class="row">
            <div class="col-6">
              <v-btn variant="tonal" class="submit-btn sub-btn mb-2" @click="signup">
                Skip
              </v-btn>
            </div>
            <div class="col-6">
              <v-btn :disabled="!imageFile" :loading="loading" variant="tonal" class="submit-btn mb-2" @click="signup">
                Save
              </v-btn>
            </div>
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
      imageFile: null,
      imageUrl: 'default-avatar.jpg',
      loading: false,
      errMsg: ""
    }
  },
  computed: {
    bgImage() {
      return `url(${this.imageUrl})`
    }
  },
  methods: {
    async signup() {
      this.loading = true
      const res = await authStore().signup(this.username, this.firstName, this.lastName, this.password, this.gender, this.imageFile);
      this.loading = false  
      if(res.statusCode == statusCode.BAD_REQUEST) {
        this.errMsg = res.error
      } else if (res.statusCode == statusCode.SUCCESS) {
        this.$router.push("/login")
      }
    },
    async validateForm() {
      const formValid = await this.$refs.form.validate();
      if (formValid.valid) {
        this.openModel = true
      }
    },
    uploadFile(e) {
      if (e.target.files.length) {
        const src = URL.createObjectURL(e.target.files[0]);
        this.imageFile = e.target.files[0];
        this.imageUrl = src;
        console.log(this.imageUrl);
      }
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
  width: 450px;
  box-shadow: 2px 2px 10px #333;
  background-color: #fff;
  border-radius: 34px;
  position: relative;
  overflow: hidden;
  display: flex;
  margin-bottom: 30px;
}
.form-wrap > div {
  padding: 32px 36px;
  min-width: 450px;
  transition: all 0.6s linear;
}
.form-avatar.open, .form-signup:has(+ .form-avatar.open) {
  transform: translateX(-450px);
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
  height: 50px;
  color: #fff;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 18px;
}
.submit-btn.sub-btn {
  background-color: var(--sub-text-color);
}
.avatar-wrap {
  width: 270px;
  height: 270px;
  margin: auto;
  position: relative;
}
.avatar-wrap > div {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
}
.avatar-wrap .mask-avatar {
  width: 100%;
  height: 100%;
  position: relative;
}
.avatar-wrap .mask-avatar::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--mask-avatar);
  content: "";
}
.avatar-wrap .avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translateY(-100%);
}
.label-avatar {
  width: 270px;
  margin: 0 auto;
  display: block;
  margin-bottom: 34px;
  padding: 6px 0;
  background-color: var(--sub-text-color);
  text-align: center;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  cursor: pointer;
}
</style>