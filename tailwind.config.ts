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
        gray500: "#5d5d5d",
        gray300: "#d4d4d4",
        primary800: "#ff4800",
      },
    },
  },
  plugins: [],
};
export default config;
