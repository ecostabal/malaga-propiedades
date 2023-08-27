/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      keyframes: {
          wiggle: {
              '0%, 100%': {
                  transform: 'rotate(-1deg)'
              },
              '50%': {
                  transform: 'rotate(1deg)'
              },
          }
      },
      animation: {
          wiggle: 'wiggle 3s ease-in-out infinite',
      }
  },

  },
  plugins: [],
}
