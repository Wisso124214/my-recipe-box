/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native")

module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ['nativewind', 'tailwindcss', 'autoprefixer'],
};