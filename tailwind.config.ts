import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '1': '0 0 15px 0 rgba(0, 0, 0, 0.1)',
        '2': '0 0 20px 0 rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
} satisfies Config;
