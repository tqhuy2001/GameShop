/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'h-2/3-width': 'calc(66% * width)',
      }
    },
  },
  plugins: [
    
  ]
}

