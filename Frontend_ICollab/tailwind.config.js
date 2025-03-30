/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        countAnimation: "count 1000ms ease-in-out forwards",
      },
      keyframes: {
        count: {
          "0%": { transform: "translateY(100%)" }, // Start from 0
          "100%": { transform: "translateY(0)" }, // End at target number
        },
      },
    },
  },
  plugins: [require("tailwindcss-motion")], // Added Rombo animation plugin
};
