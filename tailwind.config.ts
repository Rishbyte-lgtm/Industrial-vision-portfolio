import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Requested restrained color system
        background: "#F5F6F3",
        surface: "#FFFFFF",
        forest: "#172B2A",
        "muted-grey": "#697570",
        teal: {
          DEFAULT: "#347C72",
          hover: "#2a655d",
          light: "#eaf2f0"
        },
        sage: {
          DEFAULT: "#DCE8E2",
          light: "#edf4f0"
        },
        border: {
          DEFAULT: "#E5E9E5",
          dark: "#d1d9d1"
        }
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif"
        ],
        display: [
          "var(--font-display)",
          '"Newsreader"',
          '"Cormorant Garamond"',
          "Georgia",
          "serif"
        ]
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(23, 43, 42, 0.04), 0 4px 12px rgba(23, 43, 42, 0.02)",
        card: "0 2px 8px rgba(23, 43, 42, 0.04), 0 12px 24px rgba(23, 43, 42, 0.03)",
        elevated: "0 12px 36px rgba(23, 43, 42, 0.06)"
      },
      borderRadius: {
        card: "16px",
        pill: "9999px"
      }
    }
  },
  plugins: []
};

export default config;
