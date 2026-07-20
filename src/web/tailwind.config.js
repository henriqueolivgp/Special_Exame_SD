/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      chalk: '#18181B', // Coloca aqui o código da tua cor clara
      ink: '#F4F4F5',   // Coloca aqui o código da tua cor escura
    },
    screens: {
      'xxs': '250px',
      // => @media (min-width: 250px) { ... }
      'xs': '300px',
      // => @media (min-width: 300px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      'sm': '680px',
      // => @media (min-width: 680px) { ... }
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

