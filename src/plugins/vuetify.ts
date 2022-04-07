// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const light = {
  dark: false,
  colors: {
    // background: "#FFFFFF",
    // surface: "#FFFFFF",
    // // primary: "#FFCBCB",
    // "primary-darken-1": "#3700B3",
    // secondary: "#a49ee6",
    // "secondary-darken-1": "#018786",
    // error: "#B00020",
    // info: "#2196F3",
    // success: "#4CAF50",
    // warning: "#FB8C00",
    // green: "#ff0000",
    // indicator: "#000000",
  },
};

const dark = {
  dark: true,
  colors: {
    // primary: "#FFCBCB",
    // background: "#FFFFFF",
    // surface: "#FFFFFF",
    // primary: "#6200EE",#ab6bfb
    // "primary-darken-1": "#3700B3",
    // secondary: "#03DAC6",
    // "secondary-darken-1": "#018786",
    // error: "#B00020",
    // info: "#2196F3",
    // success: "#4CAF50",
    // warning: "#FB8C00",
    // green: "#ff0000",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // theme: {
  //   defaultTheme: "light",
  //   themes: {
  //     light,
  //     dark,
  //   },
  // },
});
