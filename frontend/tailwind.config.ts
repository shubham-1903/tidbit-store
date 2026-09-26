import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F9F9F6",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F3F2ED",
        },
        border: "#E7E5E4",
        text: {
          primary: "#212121",
          muted: "#57534E",
          subtle: "#78716C",
        },
        species: {
          budgie: {
            base: "#2E7D32",
            accent: "#4CAF50",
            wash: "#E8F5E9",
          },
          lovebird: {
            base: "#AD1457",
            accent: "#D81B60",
            wash: "#FCE4EC",
          },
          finch: {
            base: "#F57F17",
            accent: "#FBC02D",
            wash: "#FFF8E1",
          },
        },
      },
      fontFamily: {
        jakarta: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        level1: "0 2px 8px -2px rgba(33, 33, 33, 0.04), 0 1px 4px -1px rgba(33, 33, 33, 0.02)",
        level2: "0 12px 24px -6px rgba(46, 125, 50, 0.06), 0 4px 12px -2px rgba(33, 33, 33, 0.04)",
        level3: "0 24px 48px -12px rgba(33, 33, 33, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;