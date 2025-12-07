/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1985c3",
        primaryHover: "#1c8fd1",
        accent: "#fd0039",
        textMuted: "#acabab",
        borderNeutral: "#d5d4d4",
        layoutBg: "#eeeeee"
      },
      boxShadow: {
        header:
          "0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
};







