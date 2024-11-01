import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "safeguard-orange": "#EC7B2B",
        "safeguard-orange-dark": "#d36724",
        "safeguard-red": "#E33939",
        "safeguard-red-dark": "#D63939",
        "continue-yellow": "#F1B528",
        "continue-yellow-dark": "#D89F21",
        "school-blue": "#3047BA",
        "school-blue-dark": "#203488",
        whitesmoke: "#f5f5f5",
        deepskyblue: "#3fa4ee",
        goldenrod: "#edb53a",
        darkgray: "#8e8c8a",
        teal: "#367f71",
      },
      fontSize: {
        xs: "12px",
        lg: "18px",
        smi: "13px",
        mini: "15px",
        base: "16px",
        sm: "14px",
        inherit: "inherit",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Set to 'light' theme
  },
};
export default config;
