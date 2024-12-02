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
          "200": "#e2e2e2",
          "300": "#dcdcdc",
          "400": "#d9d9d9",
        },
        limegreen: {
          "100": "#06c719",
          "200": "rgba(6, 199, 25, 0.1)",
        },
        aliceblue: {
          "100": "#ecf1ff",
          "200": "#e2edf5",
          "300": "#e3e8ef",
        },
        royalblue: "#3971ff",

        forestgreen: "#337b07",
        gold: {
          "100": "#ecd041",
          "200": "#f3bf06",
          "300": "rgba(243, 191, 6, 0.1)",
        },

        chocolate: "#ec7b2b",
        dimgray: "#575757",
        indianred: "#e26b6b",
        khaki: "#c9e990",
        olivedrab: "#699c0b",
        crimson: "#ec4141",
        darkviolet: {
          "100": "#c018e2",
          "200": "rgba(192, 24, 226, 0.1)",
        },
        red: {
          "100": "#d70303",
          "200": "rgba(215, 3, 3, 0.1)",
        },
      },

      fontSize: {
        "3xs": "10px",
        "2xs": "11px",
        xs: "12px",
        smi: "13px",
        sm: "14px",
        mini: "15px",
        base: "16px",
        lg: "18px",
        inherit: "inherit",
      },
    },
    screens: {
      "2k": "2400px",
      "1k": "2000px",
      fhd: "1800px",
      hd: "1400px",
      "1366x720": { raw: "screen and (width: 1366px) and (height: 720px)" },
      mq1425: {
        raw: "screen and (max-width: 1425px)",
      },
      lg: {
        max: "1200px",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  borderRadius: {
    xl: "20px",
    "3xs": "10px",
    "8xs": "5px",
    "7xl-5": "26.5px",
    "81xl": "100px",
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Set to 'light' theme
  },
};
export default config;
