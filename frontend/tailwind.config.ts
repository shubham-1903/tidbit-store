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
        canvas: "var(--canvas, #F9F9F6)",
        surface: {
          DEFAULT: "var(--surface, #FFFFFF)",
          subtle: "var(--surface-subtle, #F3F2ED)",
        },
        border: "var(--border, #E7E5E4)",
        text: {
          primary: "var(--text-primary, #212121)",
          muted: "var(--text-muted, #57534E)",
          subtle: "var(--text-subtle, #78716C)",
        },
        species: {
          budgie: {
            base: "var(--species-budgie-base, #2E7D32)",
            hover: "var(--species-budgie-hover, #4CAF50)",
            deepen: "var(--species-budgie-deepen, #276A2B)",
            wash: "var(--species-budgie-wash, #E8F5E9)",
          },
          lovebird: {
            base: "var(--species-lovebird-base, #AD1457)",
            hover: "var(--species-lovebird-hover, #D81B60)",
            wash: "var(--species-lovebird-wash, #FCE4EC)",
          },
          finch: {
            base: "var(--species-finch-base, #F57F17)",
            hover: "var(--species-finch-hover, #FBC02D)",
            wash: "var(--species-finch-wash, #FFF8E1)",
          },
        },
      },
      fontFamily: {
        jakarta: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        level1: "var(--shadow-level1, 0 2px 8px -2px rgba(33, 33, 33, 0.04), 0 1px 4px -1px rgba(33, 33, 33, 0.02))",
        level2: "var(--shadow-level2, 0 12px 24px -6px rgba(46, 125, 50, 0.06), 0 4px 12px -2px rgba(33, 33, 33, 0.04))",
        level3: "var(--shadow-level3, 0 24px 48px -12px rgba(33, 33, 33, 0.12))",
      },
    },
  },
  plugins: [],
};

export default config;