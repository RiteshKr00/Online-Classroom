module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#FEDF08",
      secondary: "#B7C9E2",
      tertiary: "#C4C4C4",
      highlight: "#C4C4C4",
    }),

    // padding: {
    //   sm: '8px',
    //   md: '16px',
    //   lg: '24px',
    //   xl: '48px',
    //   br:'132px'
    //  },

    colors: {
      // Configure your color palette here

      primary: "# ",
      secondary: "#B7C9E2",
      tertiary: "#C4C4C4",
      white: "#ffffff",
    },
    fontFamily: {
      serif: ["poppins"],
    },
  },
  variants: {
    backgroundColor: ["active"],
    width: ["responsive", "hover", "focus"],
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
  },
  plugins: [],
};
