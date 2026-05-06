// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00E5A8",
        dark: "#0B0F1A",
        card: "rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};