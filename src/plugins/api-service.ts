import { App } from "vue";
import { ApiService } from "../services/api.service";

export default {
  install: (app: App) => {
    const service: ApiService = new ApiService();
    app.config.globalProperties.$apiService = service;
  },
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $apiService: ApiService;
  }
}
