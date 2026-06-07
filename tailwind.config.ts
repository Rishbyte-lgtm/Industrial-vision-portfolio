import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        graphite: "#07080b",
        panel: "#11141a",
        steel: "#8e98a8",
        signal: "#39ff88",
        cyanline: "#35d6ff",
        amberline: "#ffb547"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 38px rgba(53, 214, 255, 0.18)",
        signal: "0 0 34px rgba(57, 255, 136, 0.18)"
      },
      backgroundImage: {
        "industrial-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
