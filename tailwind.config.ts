import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        card: "#111114",
        border: "#27272a",
        muted: "#18181b",
        accent: "#e4e4e7"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 16px 40px rgba(0,0,0,0.28)"
      }
    }
  },
  plugins: []
};

export default config;
