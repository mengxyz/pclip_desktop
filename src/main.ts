import { createApp, h } from "vue";
import App from "./App.vue";
import supabaseService from "./plugins/supabase-service";
import router from "./router";
import client from "./lib/supabase";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import apiService from "./plugins/api-service";

import BalmUI from "balm-ui/dist/balm-ui";
import BalmUIPlus from "balm-ui/dist/balm-ui-plus";
import "./styles/index.scss";
import "balm-ui/dist/balm-ui.css";

import ProgressDialog from "./components/ProgressDialog.vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp({
  async beforeCreate() {
    if (useAuthStore().deviceSession == null) {
      try {
        useAuthStore().deviceSession =
          await this.$apiService.createDeviceSesstion();
      } catch (error) {
        console.error("can not create device sessions");
      }
    }
  },
  created() {
    client.auth.onAuthStateChange((_event, session) => {
      useAuthStore().authrized = session != null;
      useAuthStore().isAnon =
        session?.user?.email?.endsWith(import.meta.env.VITE_ANON_DOMAIN) ==
        true;
      if (session != null && router.currentRoute.value.name == "signIn") {
        router.push("/");
      } else {
        router.push("/signin");
      }
    });
  },
  render: () => h(App),
})
  .use(BalmUI)
  .use(BalmUIPlus)
  .use(router)
  .use(apiService)
  .use(supabaseService)
  .use(pinia)
  .component("ProgressDialog", ProgressDialog)
  .mount("#app");
