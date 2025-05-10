/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // spider: {
        //   black: "#000000",
        //   red: "#FF2D55",
        //   purple: "#8000FF",
        //   electric: "#00FFFF",
        //   pink: "#FF0080",
        //   gray: "#1C1C1C",
        // },
        deepViolet: "#1A1135",
        turquoise: "#4FFFB0",
        lavender: "#D6ADFF",
        richBlack: "#0A0A14",
        royalBlue: "#4A5CFF",
        goldenYellow: "#FFD84F",
        success: "#60E264",
        warning: "#FFAA33",
        error: "#FF4D6B",
        info: "#33BBFF",
        navbg: "#290852",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        bangers: ["Bangers", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        traderealm: ["TradeRealm", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(79, 255, 176, 0.4)",
        "glow-premium": "0 0 15px rgba(214, 173, 255, 0.4)",
        "glow-special": "0 0 15px rgba(255, 216, 79, 0.4)",
        neon: "0 0 5px #FF2D55, 0 0 10px #00FFFF, 0 0 15px #8000FF",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glitch: "glitch 0.5s infinite",
        spinSlow: "spinSlow 20s linear infinite",
        pulsePortal: "pulsePortal 6s ease-in-out infinite",
        webShoot: "webShoot 0.4s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulsePortal: {
          "0%, 100%": { transform: "scale(1)", opacity: 0.7 },
          "50%": { transform: "scale(1.2)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
