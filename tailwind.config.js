/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#4A3F5C",
        cloud: "#F6F1FA",
        card: "#FFFFFF",
        lilac: {
          DEFAULT: "#B9A6E0",
          soft: "#E4DAF5",
          deep: "#8B74C9",
        },
        blush: {
          DEFAULT: "#F5A9C0",
          soft: "#FBE1E8",
          deep: "#E27D9B",
        },
        mint: {
          DEFAULT: "#7FD1BB",
          soft: "#DCF3EC",
          deep: "#4FAF93",
        },
        butter: {
          DEFAULT: "#FFD976",
          soft: "#FFF3D6",
          deep: "#E8B23D",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Quicksand'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        floatUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        pop: "popIn 0.25s ease-out forwards",
        floatUp: "floatUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
