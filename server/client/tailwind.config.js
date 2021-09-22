const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#FEDF08",
      secondary: "#EFDAC0",
      tertiary: "#ffffff",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
  important: true,
};
