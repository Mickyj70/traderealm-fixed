/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(79, 255, 176, 0.4)",
        "glow-premium": "0 0 15px rgba(214, 173, 255, 0.4)",
        "glow-special": "0 0 15px rgba(255, 216, 79, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
