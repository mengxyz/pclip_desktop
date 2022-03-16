import { App } from "vue";
import { SupabaseServices } from "../services/supabase.service";
import client from "../lib/supabase";

export default {
  install: (app: App) => {
    const service: SupabaseServices = new SupabaseServices(client);
    app.config.globalProperties.$sbs = service;
  },
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $sbs: SupabaseServices;
  }
}
