import { Session } from "@supabase/supabase-js";
import { defineStore } from "pinia";

const DEVICE_SESSION = "device_session";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      authrized: false,
      isAnon: false,
      deviceSession: null as Session | null,
    };
  },
  persist: {
    paths: ["deviceSession"],
  },
});
