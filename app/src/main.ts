import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import "@/assets/index.css";
// Inputs
import CInputBox from "@/components/inputs/CInputBox.vue";
// Base
import CButton from "@/components/base/CButton.vue";
// Icons
import CUsersIcon from "@/components/icons/CUsersIcon.vue";
import CLogoutIcon from "@/components/icons/CLogoutIcon.vue";

createApp(App)
  .use(store)
  .use(router)
  .component('c-input-box', CInputBox)
  .component('c-users-icon', CUsersIcon)
  .component('c-logout-icon', CLogoutIcon)
  .component('c-button', CButton)
  .mount('#app');
