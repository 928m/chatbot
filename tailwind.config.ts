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
        gray800: "#181818",
        gray500: "#5d5d5d",
        gray300: "#d4d4d4",
        primary800: "#007BFF",
      },
    },
  },
  plugins: [],
};
export default config;
