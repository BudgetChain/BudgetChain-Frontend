import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4F4AE6",
        secondary: "#171720",
       
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #894DBD 0%, #5E5EFF 100%)',
      }, 
    },
  },
  plugins: [],
} satisfies Config;
