import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from "@vuetify/vite-plugin";
import WindiCSS from "vite-plugin-windicss";

/**
 * Inject Vue Devtools to index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
const inJectDevTools = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      if (process.env.NODE_ENV == "development") {
        return html.replace(
          "<!-- __DEV__TOOLS__ -->",
          '<script src="http://localhost:8098"></script>'
        );
      }
      return html;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    inJectDevTools(),
    vuetify({
      autoImport: true,
    }),
    WindiCSS(),
  ],
  envPrefix: "VITE_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
