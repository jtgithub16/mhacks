/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "synq-red": "#FF5A5F",
        "synq-blue": "#007A8E",
        "synq-bg": "#EDE0D4",
        "synq-yellow": "#FFC107",
        "synq-text": "#424242",
        "light-gray": "#D9D9D9",
        "white": "#FFFFFF"
      },
    },
  },
  plugins: [],
};
