module.exports = {
  theme: {
    extend: {
      minWidth: theme => ({ ...theme("spacing") }),
      maxWidth: theme => ({ ...theme("spacing") }),
      minHeight: theme => ({ ...theme("spacing") }),
      maxHeight: theme => ({ ...theme("spacing") }),
      colors: {
        green: { 600: "#3EA060" },
        orange: { 500: "#F09819" },
        gray: { 600: "#4B423A", 100: "#ececec" },
        cardGray: "#C4C4C4",
      },
    },
  },
  variants: {},
  plugins: [],
};
