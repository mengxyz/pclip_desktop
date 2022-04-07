import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      theme: "dark" as string | null,
    };
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
  getters: {
    isDark(): boolean {
      return this.theme === "dark";
    },
  },
  persist: {
    paths: ["theme"],
  },
});
