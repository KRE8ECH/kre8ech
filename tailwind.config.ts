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
        kre8: {
          yellow: "#F6C900",
          yellowHover: "#E5BA00",
          yellowLight: "#FEF7D2",
          yellowSoft: "#FFF9E8",
          cream: "#FAF8F2",
          creamWarm: "#FDF9EE",
          charcoal: "#202124",
          charcoalSoft: "#2D2E32",
          charcoalMuted: "#4A4C52",
          dark: "#121316",
          lightGrey: "#F7F7F8",
          borderSubtle: "#EBEBED",
          mutedGrey: "#707070",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'glow-yellow': '0 0 35px -5px rgba(246, 201, 0, 0.3)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
