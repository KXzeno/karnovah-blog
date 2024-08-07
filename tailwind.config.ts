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
      fontFamily: {
        urbanist: ['var(--font-urbanist)'],
        inter: ['var(--font-inter)'],
        cinzel: ['var(--font-cinzel)'],
        diphylleia: ['var(--font-diphylleia)'],
        merriweather: ['var(--font-merriweather)'],
        spectral: ['var(--font-spectral)'],
        dm_sans: ['var(--font-dm-sans)'],
        quicksand: ['var(--font-quicksand)'],
        dosis: ['var(--font-quicksand)'],
        sono: ['var(--font-sono)'],
      },
      container: {
        padding: "0.3rem 0.15rem",
      },
      colors: {
        'onyx': '#352F44',
      },
      keyframes: {
        'low-prio': {
          '100%':  { 'background-position': '0 30em' }
        },
        'revolver' : {
          'from': { 'transform': 'rotate(0deg)' },
          'to': { 'transform': 'rotate(90deg)' }
        }
      },
      animation: {
        glowA: 'low-prio 70s linear infinite',
        revolver: 'revolver 1s infinite'
      }
    },
  },
  plugins: [],
};
export default config;
