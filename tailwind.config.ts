import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
  prefix: "tw-",
  extract: {
    include: ["./index.html", "src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git", "dist", "src-tauri"],
  },
  preflight: false,
  plugins: [formsPlugin],
});
