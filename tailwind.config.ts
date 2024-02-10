import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      ibm: ["var(--ibm-plex-sans-thai-looped-font)"],
    },
    animation: {
      "opacity-pulse":
        "opacity-pulse .8s ease-in-out infinite alternate-reverse",
      marqueeLeft: "marqueeLeft 60s linear infinite",
      marqueeRight: "marqueeRight 60s linear infinite",
    },
    keyframes: {
      marqueeLeft: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marqueeRight: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
  },
  plugins: [],
};
export default config;
