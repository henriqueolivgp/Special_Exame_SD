/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xxs': '250px',
      // => @media (min-width: 250px) { ... }
      'xs': '300px',
      // => @media (min-width: 300px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

