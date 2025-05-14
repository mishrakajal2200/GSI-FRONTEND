/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'exact-lg': '1024px', // Custom breakpoint for exactly 1024px
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

