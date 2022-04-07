import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import client from "./lib/supabase";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import ProgressDialog from "./components/ProgressDialog.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import servicesPlugins from "./plugins/services.plugins";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "virtual:windi.css";

loadFonts();

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
  .use(router)
  .use(vuetify)
  .use(servicesPlugins)
  .use(pinia)
  .component("ProgressDialog", ProgressDialog)
  .component("ConfirmDialog", ConfirmDialog)
  .mount("#app");
