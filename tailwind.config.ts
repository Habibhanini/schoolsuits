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
        whitesmoke: {
          "100": "#f5f5f5",
          "200": "#f3f3f3",
          "300": "#eaeaea",
        },
        deepskyblue: "#3fa4ee",
        goldenrod: "#edb53a",
        teal: "#367f71",
        lightskyblue: "#6abdf8",
        cornflowerblue: "#1e95ea",
        lavender: {
          "100": "#e0e9ff",
          "200": "#cee9fd",
          "300": "#d4d9e6",
        },
        silver: {
          "100": "#c8c8c8",
          "200": "#c7c3c3",
          "300": "#c0c0c0",
        },
        oldlace: "#fff9ea",
        darkgray: {
          "100": "#99a5b7",
          "200": "#9b9b9b",
          "300": "#969696",
        },
        gainsboro: {
          "100": "#e7e7e7",
          "200": "#dcdcdc",
          "300": "#d9d9d9",
        },
        aliceblue: {
          "100": "#ecf1ff",
          "200": "#e2edf5",
          "300": "#e3e8ef",
        },
        royalblue: "#3971ff",
      },
      fontSize: {
        smi: "13px",
        "2xs": "11px",
        xs: "12px",
        sm: "14px",
        lg: "18px",
        mini: "15px",
        base: "16px",
        "3xs": "10px",
        inherit: "inherit",
      },
      limegreen: "#06c719",
      forestgreen: "#337b07",
      gold: {
        "100": "#ecd041",
        "200": "#f3bf06",
      },
      chocolate: "#ec7b2b",
      dimgray: "#575757",
      indianred: "#e26b6b",
      deepskyblue: "#28a4f1",
      teal: "#287f71",
      khaki: "#c9e990",
      olivedrab: "#699c0b",
    },
  },
  borderRadius: {
    xl: "20px",
    "3xs": "10px",
    "8xs": "5px",
    "7xl-5": "26.5px",
    "81xl": "100px",
  },
  screens: {
    mq1050: {
      raw: "screen and (max-width: 1050px)",
    },
    mq750: {
      raw: "screen and (max-width: 750px)",
    },
    mq450: {
      raw: "screen and (max-width: 450px)",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Set to 'light' theme
  },
};
export default config;
