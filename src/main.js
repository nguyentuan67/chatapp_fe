import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { aliases, fa } from 'vuetify/iconsets/fa'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

library.add(fas, far);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
});

const pinia = createPinia();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount('#app')
